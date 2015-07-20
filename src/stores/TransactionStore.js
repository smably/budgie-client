'use strict';

var Reflux = require('reflux');
var Immutable = require('immutable');

var Actions = require('actions/TransactionActions');
var Constants = require('constants/BaseConstants');
var Transaction = require('records/TransactionRecord');
var TransactionOccurrence = require('records/TransactionOccurrenceRecord');

var Ajax = require('superagent');
var prefix = require('superagent-prefix')(Constants.API_BASE);
var RRule = require('rrule');
var moment = require('moment');

var TransactionStore = Reflux.createStore({
  listenables: Actions,

  transactions: null,

  transactionOccurrences: null,

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
          var transactions = Immutable.Map();

          if (rawTransactions && rawTransactions.length > 0) {
            transactions = transactions.withMutations(function(mutableTransactions) {
              rawTransactions.forEach(function(rawTransaction) {
                mutableTransactions.set(rawTransaction.id, new Transaction(rawTransaction));
              });
            });
          }

          this.updateTransactions(transactions);
        }
      }.bind(this));
    } else {
      // Already fetched transactions
      this.trigger(this.transactionOccurrences);
    }
  },

  parseRawDate: function(rawDate) {
    if (rawDate) {
      // slice(0, -1) strips the trailing Z off the date to make it a local time
      return moment(rawDate.slice(0, -1)).toDate();
    } else {
      return null;
    }
  },

  getById: function(id) {
    return this.transactions.get(id);
  },

  getBeginDate: function() {
    // TODO should be one month before the first reconciled date (note: relies
    // on accounts having been loaded already)
    return moment().startOf('day').subtract(1, 'months').toDate();
  },

  getEndDate: function() {
    return moment().startOf('day').add(2, 'months').toDate();
  },

  getOccurrenceId: function(transaction, date) {
    return moment(date).format('YYYYMMDD') + "_" + transaction.sortIndex + "_" + transaction.id;
  },

  updateTransactionOccurrences: function(begin, end) {
    this.transactionOccurrences = Immutable.OrderedSet();

    if (this.transactions && this.transactions.size > 0) {
      this.transactions.forEach(function (transaction) {
        this.generateTransactionOccurrences(transaction, begin, end);
      }.bind(this));

      this.transactionOccurrences = this.transactionOccurrences.sort(function(a, b) {
        return a.id.localeCompare(b.id);
      });
    }

    // TODO set recurrenceIndex and isException on transaction occurrences
  },

  generateTransactionOccurrences: function(transaction, begin, end) {
    var dates;

    if (transaction.rrule) {
      var options = RRule.parseString(transaction.rrule);

      // NOTE: dtstart should NOT be defined within the rrule! It will be
      // overridden here based on dtstart on the transaction.
      options.dtstart = this.parseRawDate(transaction.dtstart);

      dates = new RRule(options).between(begin, end);

      if (dates.length > 0) {
        this.addTransactionOccurrences(transaction, dates, transaction.exdate);
      }
    } else {
      var date = this.parseRawDate(transaction.dtstart);

      // RRule.between() is being called with inc=false, so exclude begin and end
      if (date > begin && date < end) {
        this.addTransactionOccurrences(transaction, [date]);
      }
    }
  },

  addTransactionOccurrences: function(transaction, dates, exdates) {
    var exdateTimes;
    if (exdates && exdates.length > 0) {
      exdateTimes = Immutable.Set.of(exdates.map(
        function(rawDate) {
          return this.parseRawDate(rawDate).getTime();
        }.bind(this)
      ));
    } else {
      exdateTimes = Immutable.Set();
    }

    var transactionOccurrences = dates.map(function(date) {
      return new TransactionOccurrence({
        id: this.getOccurrenceId(transaction, date),
        date: date,
        transactionId: transaction.id,
        parentTransactionId: transaction.parentId,

        amount: transaction.amount,
        sourceAccountId: transaction.sourceAccountId,
        destinationAccountId: transaction.destinationAccountId,
        isReconciled: transaction.isReconciled,
        label: transaction.label,
        notes: transaction.notes,
        colour: transaction.colour,
        tags: transaction.tags,

        // TODO set isException if date matches a parent date
        isExcluded: exdateTimes.has(date.getTime())
        // TODO set recurrenceId based on sorted occurrences??
      });
    }.bind(this));

    this.transactionOccurrences = this.transactionOccurrences.concat(transactionOccurrences);
  },

  onAddTransactionSuccess: function(rawTransaction) {
    var transactions = this.transactions.set(rawTransaction.id, new Transaction(rawTransaction));

    this.updateTransactions(transactions);
  },

  onUpdateTransactionSuccess: function(rawTransaction) {
    var transactions = this.transactions.set(rawTransaction.id, new Transaction(rawTransaction));

    this.updateTransactions(transactions);
  },

  onRemoveTransactionSuccess: function(transactionId) {
    var transactions = this.transactions.delete(transactionId);

    this.updateTransactions(transactions);
  },

  updateTransactions: function(transactions) {
    this.transactions = transactions;
    this.updateTransactionOccurrences(this.getBeginDate(), this.getEndDate());
    this.trigger(this.transactionOccurrences);
  }
});

module.exports = TransactionStore;
