'use strict';

var React = require('react/addons');

var Router = require('react-router');
var Link = Router.Link;

var Actions = require('actions/TransactionActions');

var DollarView = require('components/DollarView');

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
    var balanceCell;

    if (this.props.balance) {
      balanceCell = (
        <td><DollarView amount={this.props.balance}/></td>
      );
    }

    return (
      <tr>
        <td>{transaction.date}</td>
        <td>{transaction.label}</td>
        <td>{transaction.amount}</td>
        <td><Link to="accountTransactions" params={{id: transaction.sourceAccountId}}>Source</Link></td>
        <td><Link to="accountTransactions" params={{id: transaction.destinationAccountId}}>Destination</Link></td>
        {balanceCell}
        <td><input type="button" value="-" onClick={this.removeTransaction}/></td>
      </tr>
    );
  }
});

module.exports = Transaction;
