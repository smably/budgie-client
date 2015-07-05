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
      transactionList = (
        <TransactionList accountId={this.props.params.id} accounts={this.state.accounts} transactions={this.state.transactions} />
      );
    } else {
      transactionList = (
        <TransactionList accounts={this.state.accounts} transactions={this.state.transactions} />
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
