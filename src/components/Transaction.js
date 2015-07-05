'use strict';

var React = require('react/addons');

var moment = require('moment');

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
    var sourceLabel = this.props.sourceAccount ?
      this.props.sourceAccount.label :
      "(unknown)";
    var destinationLabel = this.props.destinationAccount ?
      this.props.destinationAccount.label :
      "(unknown)";

    if (this.props.balance) {
      balanceCell = (
        <td><DollarView amount={this.props.balance}/></td>
      );
    }

    return (
      <tr>
        <td>{moment(transaction.date).format('MMMM D, YYYY')}</td>
        <td>{transaction.label}</td>
        <td><DollarView amount={transaction.amount} isNegative={this.props.isNegative}/></td>
        <td><Link to="accountTransactions" params={{id: transaction.sourceAccountId}}>{sourceLabel}</Link></td>
        <td><Link to="accountTransactions" params={{id: transaction.destinationAccountId}}>{destinationLabel}</Link></td>
        {balanceCell}
        <td><input type="button" value="-" onClick={this.removeTransaction}/></td>
      </tr>
    );
  }
});

module.exports = Transaction;
