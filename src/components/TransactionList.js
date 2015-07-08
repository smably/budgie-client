'use strict';

var React = require('react/addons');
var Immutable = require('immutable');

var Transaction = require('components/Transaction');
var AddTransactionForm = require('components/AddTransactionForm');

var TransactionList = React.createClass({
  renderTransactionHeader: function(hasBalance) {
    var balanceHeader;

    if (hasBalance) {
      balanceHeader = (
        <th>Balance</th>
      );
    }

    return (
      <tr>
        <th>Date</th>
        <th>Transaction</th>
        <th>Amount</th>
        <th>From Account</th>
        <th>To Account</th>
        {balanceHeader}
        <th></th>
      </tr>
    );
  },

  renderTransactionRows: function(hasBalance) {
    var transactionRows = [];

    if (this.props.transactions && this.props.transactions.size > 0) {
      if (hasBalance) {
        var sourceAccount, destinationAccount;
        var accountBalance = 0;
        var isOutgoing = false;
        var self = this;

        this.props.transactions.filter(
          function(transaction) {
            return transaction.sourceAccountId === self.props.accountId ||
              transaction.destinationAccountId === self.props.accountId;
          }
        ).forEach(
          function(transaction) {
            accountBalance = self.incrementAccountBalance(accountBalance, transaction);
            isOutgoing = self.isOutgoing(transaction);
            sourceAccount = self.props.accounts.get(transaction.sourceAccountId);
            destinationAccount = self.props.accounts.get(transaction.destinationAccountId);

            transactionRows.push(
              <Transaction
                key={transaction.sortId}
                data={transaction}
                sourceAccount={sourceAccount}
                destinationAccount={destinationAccount}
                balance={accountBalance}
                isNegative={isOutgoing}
                />
            );
          }
        );
      } else {
        this.props.transactions.forEach(function(transaction) {
          transactionRows.push(
            <Transaction key={transaction.sortId} data={transaction}/>
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
    var newBalance = accountBalance;

    if (this.isOutgoing(transaction)) {
      newBalance -= transaction.amount;
    } else {
      newBalance += transaction.amount;
    }

    return newBalance;
  },

  isOutgoing: function(transaction) {
    return this.props.accountId === transaction.sourceAccountId;
  },

  render: function() {
    var hasBalance = this.props.accountId && true;
    var transactionHeader = this.renderTransactionHeader(hasBalance);
    var transactionRows = this.renderTransactionRows(hasBalance);

    return (
      <table className='main'>
        <tbody>
          {transactionHeader}
          {transactionRows}
        </tbody>
      </table>
    );
  }
});

module.exports = TransactionList;
