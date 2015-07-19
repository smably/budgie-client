'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Button = require('react-bootstrap').Button;
var Link = require('react-router').Link;

var Constants = require('constants/BaseConstants');

var AccountActions = require('actions/AccountActions');
var TransactionActions = require('actions/TransactionActions');

var AccountStore = require('stores/AccountStore');
var TransactionStore = require('stores/TransactionStore');

var TransactionList = require('components/TransactionList');
var TransactionModal = require('components/TransactionModal');

var TransactionsView = React.createClass({
  mixins: [
    Reflux.connect(AccountStore, "accounts"),
    Reflux.connect(TransactionStore, "transactions")
  ],

  componentDidMount: function () {
      AccountActions.load();
      TransactionActions.load();
  },

  openAddTransactionModal: function() {
    this.refs.transactionModal.updateAction(Constants.CRUD_ACTIONS.CREATE);
    this.refs.transactionModal.open();
  },

  openEditTransactionModal: function(transaction) {
    this.refs.transactionModal.updateAction(Constants.CRUD_ACTIONS.UPDATE);
    this.refs.transactionModal.updateActiveTransaction(transaction);
    this.refs.transactionModal.open();
  },

  openDeleteTransactionModal: function(transaction) {
    this.refs.transactionModal.updateAction(Constants.CRUD_ACTIONS.DELETE);
    this.refs.transactionModal.updateActiveTransaction(transaction);
    this.refs.transactionModal.open();
  },

  render: function() {
    var transactionList;
    var pageTitle = (
      <h3>Transactions</h3>
    );

    if (this.props.params.id && this.state.accounts) {
      var accountName = this.state.accounts.get(this.props.params.id).label;

      pageTitle = (
        <h3>Transactions: {accountName}</h3>
      );
    }

    transactionList = (
      <TransactionList
        accountId={this.props.params.id}
        accounts={this.state.accounts}
        transactions={this.state.transactions}
        editCallback={this.openEditTransactionModal}
        deleteCallback={this.openDeleteTransactionModal}
      />
    );

    return (
      <div>
        {pageTitle}

        <Button bsStyle='primary' onClick={this.openAddTransactionModal}>
          <span className="glyphicon glyphicon-plus"></span> New Transaction
        </Button>

        {transactionList}

        <Link to="accounts">Back to Accounts</Link>

        <TransactionModal ref='transactionModal'/>
      </div>
    );
  }
});

module.exports = TransactionsView;
