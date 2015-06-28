'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var TransactionStore = require('stores/TransactionStore');

var TransactionList = require('components/TransactionList');

var TransactionsView = React.createClass({
  mixins: [Reflux.connect(TransactionStore, "transactions")],

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
