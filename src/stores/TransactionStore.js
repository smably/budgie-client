'use strict';

var Reflux = require('reflux');

var Actions = require('actions/TransactionActions');
var Constants = require('constants/BaseConstants');
var Transaction = require('records/TransactionRecord');

var Ajax = require('superagent');
var prefix = require('superagent-prefix')(Constants.API_BASE);
var RRule = require('rrule');
var moment = require('moment');

var TransactionStore = Reflux.createStore({
  listenables: Actions,

  transactions: [],

  init: function() {
    this.listenTo(Actions.load, this.fetchData);
  },

  fetchData: function() {
    Ajax.get('/transactions')
    .use(prefix)
    .end(function(err, res) {
      if (err) {
        console.log("Error fetching:", err);
      } else {
        var rawTransactions = JSON.parse(res.text);
        var transactions = [];
        var options;
        var dates;

        var begin = moment().startOf('day').subtract(1, 'years');
        var end = moment().startOf('day').add(1, 'years');

        rawTransactions.map(function (rawTransaction) {
          if (rawTransaction.isRecurring) {
            options = RRule.parseString(rawTransaction.rrule);

            options.dtstart = new Date(options.dtstart.getTime() + (options.dtstart.getTimezoneOffset() * 60 * 1000));

            dates = new RRule(options).between(begin.toDate(), end.toDate(), true);

            dates.forEach(function(date) {
              var transaction = new Transaction(rawTransaction);

              transaction = transaction.withMutations(function(mutableTransaction) {
                mutableTransaction.set("date", date.toJSON());
                mutableTransaction.set("rrule", null);
              });

              transactions.push(transaction);
            });

            // TODO handle rdate and exdate

          } else {
            transactions.push(new Transaction(rawTransaction));
          }
        });

        this.transactions = transactions;
        this.trigger(this.transactions);
      }
    }.bind(this));
  },

  onAddTransactionSuccess: function(transaction) {
    this.updateTransactions(this.transactions.concat([transaction]));
  },

  onRemoveTransactionSuccess: function(transactionId) {
    var filteredTransactions = this.transactions.filter(function(transaction) {
      return transaction.id !== transactionId;
    });

    this.updateTransactions(filteredTransactions);
  },

  updateTransactions: function(transactions) {
    this.transactions = transactions;
    this.trigger(transactions);
  }

});

module.exports = TransactionStore;
