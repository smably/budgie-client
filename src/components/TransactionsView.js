'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Link = require('react-router').Link;

var AccountActions = require('actions/AccountActions');
var TransactionActions = require('actions/TransactionActions');

var AccountStore = require('stores/AccountStore');
var TransactionStore = require('stores/TransactionStore');

var TransactionList = require('components/TransactionList');

var TransactionsView = React.createClass({
  mixins: [
    Reflux.connect(AccountStore, "accounts"),
    Reflux.connect(TransactionStore, "transactions")
  ],

  componentDidMount: function () {
    if (!this.state.accounts) {
      AccountActions.load();
    }

    if (!this.state.transactions) {
      TransactionActions.load();
    }
  },

  render: function() {
    var transactionList;
    var pageTitle = (
      <h3>Transactions</h3>
    );

    if (this.props.params.id && this.state.accounts) {
      var accountName = this.state.accounts.get(this.props.params.id).label;

      pageTitle = (
        <h3>Transactions: {accountName}</h3>
      );
    }

    transactionList = (
      <TransactionList accountId={this.props.params.id} accounts={this.state.accounts} transactions={this.state.transactions} />
    );

    return (
      <div>
        {pageTitle}
        <button type="button" className="btn btn-primary">
          <span className="glyphicon glyphicon-plus"></span> New Transaction
        </button>
        {transactionList}
        <Link to="accounts">Back to Accounts</Link>
      </div>
    );
  }
});

module.exports = TransactionsView;
