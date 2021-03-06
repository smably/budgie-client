'use strict';

var React = require('react/addons');
var moment = require('moment');
var Router = require('react-router');
var Link = Router.Link;

var Actions = require('actions/TransactionActions');
var DollarView = require('components/DollarView');
var TransactionStore = require('stores/TransactionStore');

var Transaction = React.createClass({
  editTransaction: function() {
    if (typeof this.props.editCallback === "function") {
      this.props.editCallback(TransactionStore.getById(this.props.data.transactionId));
    }
  },

  deleteTransaction: function() {
    if (typeof this.props.deleteCallback === "function") {
      this.props.deleteCallback(TransactionStore.getById(this.props.data.transactionId));
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
        <td className="dollar-amount"><DollarView amount={this.props.balance}/></td>
      );
    }

    var today = new Date();
    today.setHours(0, 0, 0, 0);
    var transactionTimeOffset = transaction.date.getTime() - today.getTime();

    var transactionClass = "today";
    if (transactionTimeOffset < 0) {
      transactionClass = "before-today";
    } else if (transactionTimeOffset > 0) {
      transactionClass = "after-today";
    }

    return (
      <tr className={transactionClass}>
        <td>{moment(transaction.date).format('MMMM D, YYYY')}</td>
        <td>{transaction.label}</td>
        <td className="dollar-amount"><DollarView amount={transaction.amount} isNegative={this.props.isNegative}/></td>
        <td><Link to="accountTransactions" params={{id: transaction.sourceAccountId}}>{sourceLabel}</Link></td>
        <td><Link to="accountTransactions" params={{id: transaction.destinationAccountId}}>{destinationLabel}</Link></td>
        {balanceCell}
        <td className="buttons">
          <span className="glyphicon glyphicon-pencil" onClick={this.editTransaction}></span>
          <span className="glyphicon glyphicon-remove" onClick={this.deleteTransaction}></span>
        </td>
      </tr>
    );
  }
});

module.exports = Transaction;
