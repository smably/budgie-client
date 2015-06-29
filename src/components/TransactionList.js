'use strict';

var React = require('react/addons');

var Transaction = require('components/Transaction');
var AddTransactionForm = require('components/AddTransactionForm');

var TransactionList = React.createClass({
  renderTransactionRows: function() {
    var transactionRows = [];

    if (this.props.transactions && this.props.transactions.length > 0) {
      if (this.props.account) {
        var accountBalance = 0;
        var self = this;

        this.props.transactions.filter(
          function(transaction) {
            return transaction.sourceAccountId === self.props.account.id ||
              transaction.destinationAccountId === self.props.account.id;
          }
        ).forEach(
          function(transaction) {
            //accountBalance = self.incrementAccountBalance(accountBalance, transaction);
            transactionRows.push(
              <Transaction key={transaction.id} data={transaction} balance={accountBalance}/>
            );
          }
        );
      } else {
        this.props.transactions.forEach(function(transaction) {
          transactionRows.push(
            <Transaction key={transaction.id} data={transaction}/>
          );
        });
      }
    }

    if (transactionRows.length === 0) {
      transactionRows = (
        <tr>
          <td colSpan="7">No transactions found!</td>
        </tr>
      );
    }

    return transactionRows;
  },

  incrementAccountBalance: function(accountBalance, transaction) {
    // FIXME
    return true;
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
            <th>From Account</th>
            <th>To Account</th>
            <th>+/-</th>
          </tr>
          {transactionRows}
          <AddTransactionForm/>
        </tbody>
      </table>
    );
  }
});

module.exports = TransactionList;
