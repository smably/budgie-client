'use strict';

var React = require('react/addons');

var Immutable = require('immutable');

var Transaction = require('components/Transaction');
var AddTransactionForm = require('components/AddTransactionForm');

var TransactionList = React.createClass({
  accountMap: null,

  componentWillReceiveProps: function(newProps) {
    if (newProps.accounts) {
      this.accountMap = Immutable.Map().withMutations(function(mutableAccountMap) {
        newProps.accounts.forEach(function(account) {
          mutableAccountMap.set(account.id, account);
        });
      });
    }
  },

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
        <th>+/-</th>
      </tr>
    );
  },

  renderTransactionRows: function(hasBalance) {
    var transactionRows = [];

    if (this.props.transactions && this.props.transactions.length > 0) {
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
            sourceAccount = self.accountMap.get(transaction.sourceAccountId);
            destinationAccount = self.accountMap.get(transaction.destinationAccountId);

            transactionRows.push(
              <Transaction
                key={transaction.uniqueId}
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
            <Transaction key={transaction.uniqueId} data={transaction}/>
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
          <AddTransactionForm hasBalance={hasBalance}/>
        </tbody>
      </table>
    );
  }
});

module.exports = TransactionList;
