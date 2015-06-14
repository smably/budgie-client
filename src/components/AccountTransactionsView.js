'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

var AccountStore = require('stores/AccountStore');
var TransactionStore = require('stores/TransactionStore');

var AccountList = require('components/AccountList');

var AccountTransactionsView = React.createClass({
  mixins: [
    Reflux.connect(AccountStore, "accounts"),
    Reflux.connect(TransactionStore, "transactions")
  ],

  render: function() {
    console.log(this.props);

    return (
      <h2>TODO</h2>
    );
  }
});

module.exports = AccountTransactionsView;
