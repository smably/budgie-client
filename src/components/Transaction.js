'use strict';

var React = require('react/addons');

var Router = require('react-router');
var Link = Router.Link;

var Actions = require('actions/TransactionActions');

var Transaction = React.createClass({
  removeTransaction: function() {
    if (this.props.data.id) {
      Actions.removeTransaction(this.props.data.id);
    } else {
      console.log("Can't delete! No ID found for transaction.");
    }
  },

  render: function() {
    var transaction = this.props.data;

    return (
      <tr>
        <td>{transaction.date}</td>
        <td>{transaction.label}</td>
        <td>{transaction.amount}</td>
        <td>{transaction.fromAccount}</td>
        <td>{transaction.toAccount}</td>
        <td>$0.00</td>
        <td>$0.00</td>
      </tr>
    );
  }
});

module.exports = Transaction;
