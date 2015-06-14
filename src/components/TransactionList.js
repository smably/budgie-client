'use strict';

var React = require('react/addons');

var TransactionActions = require('actions/TransactionActions');

var Transaction = require('components/Transaction');

var TransactionList = React.createClass({
  componentDidMount: function () {
    TransactionActions.load();
  },

  renderTransactionRows: function() {
    var transactionRows = [];

    if (this.props.transactions) {
      this.props.transactions.forEach(function(transaction) {
        transactionRows.push(
          <Transaction key={transaction.id} data={transaction}/>
        );
      });
    } else {
      transactionRows = (
        <tr>
          <td colSpan="7">No transactions found!</td>
        </tr>
      );
    }

    return transactionRows;
  },

  render: function() {
    var transactionRows = this.renderTransactionRows();

    return (
      <table className='main'>
        <tbody>
          <tr>
            <th>Date</th>
            <th>Transaction</th>
            <th>Amount</th>
            <th>To Account</th>
            <th>From Account</th>
            <th>Balance: Primary</th>
            <th>(Balance: other accounts)</th>
          </tr>
          {transactionRows}
        </tbody>
      </table>
    );
  }
});

module.exports = TransactionList;
