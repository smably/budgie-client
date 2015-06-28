'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var AccountStore = require('stores/AccountStore');
var TransactionStore = require('stores/TransactionStore');

var TransactionList = require('components/TransactionList');

var AccountTransactionsView = React.createClass({
  mixins: [
    Reflux.connect(AccountStore, "accounts"),
    Reflux.connect(TransactionStore, "transactions")
  ],

  render: function() {
    return (
      <div>
        <h2>Transactions</h2>
        <TransactionList accountId={this.props.params.id} transactions={this.state.transactions} />
      </div>
    );
  }
});

module.exports = AccountTransactionsView;
