'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var TransactionActions = require('actions/TransactionActions');

var TransactionStore = require('stores/TransactionStore');

var TransactionList = require('components/TransactionList');

var TransactionsView = React.createClass({
  mixins: [Reflux.connect(TransactionStore, "transactions")],

  componentDidMount: function () {
    TransactionActions.load();
  },

  render: function() {
    return (
      <div>
        <h2>Transactions</h2>
        <TransactionList transactions={this.state.transactions} />
      </div>
    );
  }
});

module.exports = TransactionsView;
