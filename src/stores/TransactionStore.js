'use strict';

var Reflux = require('reflux');
var Immutable = require('immutable');

var Actions = require('actions/TransactionActions');
var Constants = require('constants/BaseConstants');
var Transaction = require('records/TransactionRecord');

var Ajax = require('superagent');
var prefix = require('superagent-prefix')(Constants.API_BASE);
var RRule = require('rrule');
var moment = require('moment');

var TransactionStore = Reflux.createStore({
  listenables: Actions,

  transactions: null,

  init: function() {
    this.listenTo(Actions.load, this.fetchData);
  },

  fetchData: function() {
    if (this.transactions === null) {
      Ajax.get('/transactions')
      .use(prefix)
      .end(function(err, res) {
        if (err) {
          console.log("Error fetching transactions: ", err);
        } else {
          var rawTransactions = JSON.parse(res.text);
          this.transactions = Immutable.Set();

          if (rawTransactions && rawTransactions.length > 0) {
            rawTransactions.forEach(function (rawTransaction) {
              if (rawTransaction.isRecurring) {
                this.handleRecurringTransaction(rawTransaction);
              } else {
                this.handleSingleTransaction(rawTransaction);
              }
            }.bind(this));
          }

          this.transactions = this.transactions.sort(function(a, b) {
            return a.sortId.localeCompare(b.sortId);
          });
        }

        this.trigger(this.transactions);
      }.bind(this));
    } else {
      this.trigger(this.transactions);
    }
  },

  handleRecurringTransaction: function(rawTransaction) {
    var options;
    var dates;

    var begin = moment().startOf('day').subtract(1, 'years');
    var end = moment().startOf('day').add(1, 'years');

    options = RRule.parseString(rawTransaction.rrule);

    // NOTE: dtstart is IGNORED! Do not use it unless it is set here!!
    options.dtstart = new Date(rawTransaction.date);

    dates = new RRule(options).between(begin.toDate(), end.toDate(), true);

    // TODO handle rdate and exdate
    // Need to parse them into a list, add rdate entries, remove exdate entries

    dates.forEach(function(date) {
      var transaction = new Transaction(rawTransaction).withMutations(
        function(mutatableTransaction) {
          mutatableTransaction.set("date", date.toJSON());
          mutatableTransaction.set("rrule", null);
          mutatableTransaction.set("sortId", this.getSortId(mutatableTransaction, date));
        }.bind(this)
      );

      this.transactions = this.transactions.add(transaction);
    }.bind(this));
  },

  handleSimpleTransaction: function(rawTransaction) {
    var date = new Date(rawTransaction.date);
    var transaction = new Transaction(rawTransaction).set("sortId", this.getSortId(transaction, date));

    this.transactions = this.transactions.add(transaction);
  },

  getSortId: function(transaction, date) {
    return moment(date).format('YYYYMMDD') + "_" + transaction.sortIndex + "_" + transaction.id;
  },

  onAddTransactionSuccess: function(rawTransaction) {
    if (rawTransaction.isRecurring) {
      this.handleRecurringTransaction(rawTransaction);
    } else {
      this.handleSimpleTransaction(rawTransaction);
    }

    this.trigger(this.transactions);
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
