'use strict';

var React = require('react/addons');
var Immutable = require('immutable');

var Transaction = require('components/Transaction');

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
      var sourceAccount, destinationAccount;

      if (hasBalance) {
        var accountBalance = 0;
        var isOutgoing = false;

        this.props.transactions.filter(
          function(transaction) {
            return transaction.sourceAccountId === this.props.accountId ||
              transaction.destinationAccountId === this.props.accountId;
          }.bind(this)
        ).forEach(
          function(transaction) {
            accountBalance = this.incrementAccountBalance(accountBalance, transaction);
            isOutgoing = this.isOutgoing(transaction);
            sourceAccount = this.props.accounts.get(transaction.sourceAccountId);
            destinationAccount = this.props.accounts.get(transaction.destinationAccountId);

            transactionRows.push(
              <Transaction
                key={transaction.sortId}
                data={transaction}
                sourceAccount={sourceAccount}
                destinationAccount={destinationAccount}
                balance={accountBalance}
                isNegative={isOutgoing}
                editCallback={ function() { this.props.editCallback(transaction); }.bind(this) }
                deleteCallback={ function() { this.props.deleteCallback(transaction); }.bind(this) }
              />
            );
          }.bind(this)
        );
      } else {
        this.props.transactions.forEach(function(transaction) {
          if (this.props.accounts) {
            sourceAccount = this.props.accounts.get(transaction.sourceAccountId);
            destinationAccount = this.props.accounts.get(transaction.destinationAccountId);
          }

          transactionRows.push(
            <Transaction
              key={transaction.sortId}
              data={transaction}
              sourceAccount={sourceAccount}
              destinationAccount={destinationAccount}
              editCallback={ function() { this.props.editCallback(transaction); }.bind(this) }
              deleteCallback={ function() { this.props.deleteCallback(transaction); }.bind(this) }
            />
          );
        }.bind(this));
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
