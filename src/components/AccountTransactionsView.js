'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var AccountActions = require('actions/AccountActions');
var TransactionActions = require('actions/TransactionActions');

var AccountStore = require('stores/AccountStore');
var TransactionStore = require('stores/TransactionStore');

var TransactionList = require('components/TransactionList');

var AccountTransactionsView = React.createClass({
  mixins: [
    Reflux.connect(AccountStore, "accounts"),
    Reflux.connect(TransactionStore, "transactions")
  ],

  componentDidMount: function () {
    AccountActions.load();
    TransactionActions.load();
  },

  render: function() {
    var transactionList;

    if (this.state.accounts) {
      var self = this;

      this.state.accounts.some(function(account) {
        if (account.id === self.props.params.id) {
          transactionList = (
            <TransactionList account={account} transactions={self.state.transactions} />
          );
          return true;
        } else {
          return false;
        }
      });
    } else {
      transactionList = (
        <TransactionList transactions={this.state.transactions} />
      );
    }

    return (
      <div>
        <h2>Transactions</h2>
        {transactionList}
      </div>
    );
  }
});

module.exports = AccountTransactionsView;
