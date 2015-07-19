'use strict';

var React = require('react/addons');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var Constants = require('constants/BaseConstants');

var Actions = require('actions/TransactionActions');

var TransactionRecord = require('records/TransactionRecord');

var DeleteContent = require('components/TransactionModalContent/Delete');
var CreateOrUpdateContent = require('components/TransactionModalContent/CreateOrUpdate');

var TransactionModal = React.createClass({
  getInitialState: function() {
    return {
      showModal: false,
      action: Constants.CRUD_ACTIONS.CREATE,
      activeTransaction: null
    };
  },

  open: function() {
    this.setState({ showModal: true });
  },

  close: function() {
    this.setState({ showModal: false });
  },

  updateAction: function(newAction) {
    this.setState({ action: newAction });
  },

  updateActiveTransaction: function(newActiveTransaction) {
    this.setState({ activeTransaction: newActiveTransaction });
  },

  saveTransaction: function() {
    if (this.refs.transactionForm) {
      this.refs.transactionForm.saveTransaction();
    }

    this.close();
  },

  addTransaction: function() {
    if (this.refs.transactionForm) {
      this.refs.transactionForm.addTransaction();
    }

    this.close();
  },

  removeTransaction: function() {
    if (this.state.activeTransaction) {
      Actions.removeTransaction(this.state.activeTransaction.get("id"));
    }

    this.close();
  },

  render: function() {
    var modalContent;

    if (this.state.action === Constants.CRUD_ACTIONS.DELETE) {
      var transactionLabel = this.state.activeTransaction ?
        this.state.activeTransaction.get("label") :
        "";

      modalContent = (
        <DeleteContent
          transactionLabel={transactionLabel}
          deleteCallback={this.removeTransaction}
          closeCallback={this.close}
        />
      );
    } else {
      modalContent = (
        <CreateOrUpdateContent
          activeTransaction={this.state.activeTransaction}
          action={this.state.action}
          createCallback={this.addTransaction}
          updateCallback={this.saveTransaction}
          closeCallback={this.close}
        />
      );
    }

    return (
      <Modal show={this.state.showModal} onHide={this.close}>
        {modalContent}
      </Modal>
    );
  }
});

module.exports = TransactionModal;
