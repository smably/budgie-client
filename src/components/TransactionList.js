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

  getTransactionRow: function(transaction, accountBalance) {
    var sourceAccount, destinationAccount;

    if (this.props.accounts) {
      sourceAccount = this.props.accounts.get(transaction.sourceAccountId);
      destinationAccount = this.props.accounts.get(transaction.destinationAccountId);
    }

    return (
      <Transaction
        key={transaction.id}
        data={transaction}
        sourceAccount={sourceAccount}
        destinationAccount={destinationAccount}
        balance={accountBalance}
        isNegative={this.isOutgoing(transaction, sourceAccount, destinationAccount)}
        editCallback={this.props.editCallback}
        deleteCallback={this.props.deleteCallback}
      />
    );
  },

  renderTransactionRows: function(hasBalance) {
    var transactionRows = [];

    if (this.props.transactions && this.props.transactions.size > 0) {
      if (hasBalance) {
        var accountBalance = 0;
        var isOutgoing = false;

        transactionRows = this.props.transactions.filter(
          function(transaction) {
            return transaction.sourceAccountId === this.props.accountId ||
              transaction.destinationAccountId === this.props.accountId;
          }.bind(this)
        ).map(
          function(transaction) {
            accountBalance = this.incrementAccountBalance(accountBalance, transaction);

            return this.getTransactionRow(transaction, accountBalance);
          }.bind(this)
        );
      } else {
        transactionRows = this.props.transactions.map(function(transaction) {
          return this.getTransactionRow(transaction);
        }.bind(this));
      }
    }

    if (transactionRows.size === 0) {
      transactionRows = (
        <tr>
          <td colSpan="7">No transactions found!</td>
        </tr>
      );
    }

    return transactionRows;
  },

  incrementAccountBalance: function(accountBalance, transaction) {
    return this.isOutgoing(transaction) ?
      accountBalance - transaction.amount :
      accountBalance + transaction.amount;
  },

  isOutgoing: function(transaction, sourceAccount, destinationAccount) {
    // If viewing transactions for an account, outgoing is determined based on
    // the account being viewed.
    if (this.props.accountId) {
      return this.props.accountId === transaction.sourceAccountId;
    }

    // Transfers out of the primary account are always outgoing.
    if (sourceAccount && sourceAccount.isPrimary) {
      return true;
    }

    // If destination account doesn't exist, then we can't tell if the
    // transaction is outgoing, so return false. If the destination account
    // exists and is a source, then it's just a transfer among accounts. If not,
    // then funds are leaving the system, so consider the transaction to be
    // outgoing.
    return (destinationAccount && !destinationAccount.isSource);
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
