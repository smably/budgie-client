'use strict';

var Reflux = require('reflux');

var Actions = require('actions/TransactionActions');
var Constants = require('constants/BaseConstants');
var Transaction = require('records/TransactionRecord');

var Ajax = require('superagent');
var prefix = require('superagent-prefix')(Constants.API_BASE);

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

        // FIXME
        //console.log("Got transactions:", rawTransactions);

        rawTransactions.map(function (transaction) {
          transactions.push(new Transaction(transaction));
        });

        this.transactions = transactions;
        this.trigger(this.transactions);
      }
    }.bind(this));
  }
});

module.exports = TransactionStore;
