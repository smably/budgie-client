'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Link = require('react-router').Link;

var Constants = require('constants/BaseConstants');

var AccountActions = require('actions/AccountActions');
var TransactionActions = require('actions/TransactionActions');

var AccountStore = require('stores/AccountStore');
var TransactionStore = require('stores/TransactionStore');

var TransactionList = require('components/TransactionList');
var GenericModal = require('components/GenericModal');

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
    this.refs.transactionModal.updateActiveObject(transaction);
    this.refs.transactionModal.open();
  },

  openDeleteTransactionModal: function(transaction) {
    this.refs.transactionModal.updateAction(Constants.CRUD_ACTIONS.DELETE);
    this.refs.transactionModal.updateActiveObject(transaction);
    this.refs.transactionModal.open();
  },

  render: function() {
    var pageTitle;

    if (this.props.params.id && this.state.accounts) {
      var accountName = this.state.accounts.get(this.props.params.id).label;

      pageTitle = (
        <h3>Transactions: {accountName}</h3>
      );
    } else {
      pageTitle = (
        <h3>Transactions</h3>
      );
    }

    return (
      <div>
        {pageTitle}

        <Button bsStyle='primary' onClick={this.openAddTransactionModal}>
          <Glyphicon glyph="plus"/> New Transaction
        </Button>

        <TransactionList
          accountId={this.props.params.id}
          accounts={this.state.accounts}
          transactions={this.state.transactions}
          editCallback={this.openEditTransactionModal}
          deleteCallback={this.openDeleteTransactionModal}
        />

        <Link to="accounts">Back to Accounts</Link>

        <GenericModal ref='transactionModal' objectType={Constants.OBJECT_TYPES.TRANSACTION}/>
      </div>
    );
  }
});

module.exports = TransactionsView;
