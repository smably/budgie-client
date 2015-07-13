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
          console.log("Error fetching transactions:", err);
        } else {
          var rawTransactions = JSON.parse(res.text);
          this.transactions = Immutable.Set();

          if (rawTransactions && rawTransactions.length > 0) {
            this.handleTransactions(rawTransactions);
          }

          this.trigger(this.transactions);
        }
      }.bind(this));
    } else {
      // Already fetched transactions
      this.trigger(this.transactions);
    }
  },

  handleTransactions: function(rawTransactions) {
    if (rawTransactions && rawTransactions.length > 0) {
      rawTransactions.forEach(function (rawTransaction) {
        if (rawTransaction.rrule) {
          this.handleRecurringTransaction(rawTransaction);
        } else {
          this.handleSingleTransaction(rawTransaction);
        }
      }.bind(this));
    }

    this.transactions = this.transactions.sort(function(a, b) {
      return a.sortId.localeCompare(b.sortId);
    });
  },

  handleRecurringTransaction: function(rawTransaction) {
    var dates;

    var parseRawDate = function(rawDate) {
      // slice(0, -1) strips the trailing Z off the date to make it a local time
      return moment(rawDate.slice(0, -1)).toDate();
    };

    if (rawTransaction.rrule) {
      var options = RRule.parseString(rawTransaction.rrule);

      // NOTE: dtstart should NOT be defined within the rrule! It will be
      // overridden here based on dtstart on the transaction.
      options.dtstart = parseRawDate(rawTransaction.date);

      var begin = moment().startOf('day').subtract(1, 'years').toDate();
      var end = moment().startOf('day').add(1, 'years').toDate();

      dates = new RRule(options).between(begin, end);
    } else {
      dates = [];
    }

    if (rawTransaction.rdate && rawTransaction.rdate.length > 0) {
      dates = dates.concat(rawTransaction.rdate.map(parseRawDate));
    }

    if (rawTransaction.exdate && rawTransaction.exdate.length > 0) {
      rawTransaction.exdate.map(parseRawDate).forEach(function(exdate) {
        dates = dates.filter(function(date) {
          return date.getTime() !== exdate.getTime();
        });
      });
    }

    dates.forEach(function(date) {
      var transaction = new Transaction(rawTransaction).withMutations(
        function(mutatableTransaction) {
          mutatableTransaction.set("dtstart", date.toJSON());
          mutatableTransaction.set("rrule", null);
          mutatableTransaction.set("sortId", this.getSortId(mutatableTransaction, date));
        }.bind(this)
      );

      this.transactions = this.transactions.add(transaction);
    }.bind(this));
  },

  handleSimpleTransaction: function(rawTransaction) {
    // FIXME compatibility with old transactions
    if (rawTransaction.date && !rawTransaction.dtstart) {
      rawTransaction.dtstart = rawTransaction.date;
      delete rawTransaction.date;
    }

    var date = new Date(rawTransaction.dtstart);

    var transaction = new Transaction(rawTransaction).set("sortId", this.getSortId(transaction, date));

    this.transactions = this.transactions.add(transaction);
  },

  getSortId: function(transaction, date) {
    return moment(date).format('YYYYMMDD') + "_" + transaction.sortIndex + "_" + transaction.id;
  },

  onAddTransactionSuccess: function(rawTransaction) {
    if (rawTransaction.rrule) {
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
