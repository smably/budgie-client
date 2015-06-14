'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = Router.Link;

var TransactionStore = require('stores/TransactionStore');

var TransactionList = require('components/TransactionList');

var TransactionsView = React.createClass({
  mixins: [Reflux.connect(TransactionStore, "transactions")],

  render: function() {
    console.log(this.props);

    return (
      <h2>TODO</h2>
    );
  }
});

module.exports = TransactionsView;
