'use strict';

var React = require('react/addons');

var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var Actions = require('actions/AccountActions');

var AccountRecord = require('records/AccountRecord');

var AccountForm = require('components/AccountForm');

var DeleteAccountModal = React.createClass({
  removeAccount: function() {
    var accountId = this.props.account.get("id");

    Actions.removeAccount(accountId);
    this.close();
  },

  getInitialState: function() {
    return { showModal: false };
  },

  close: function() {
    this.setState({ showModal: false });
  },

  open: function() {
    this.setState({ showModal: true });
  },

  render: function() {
    var accountLabel = this.props.account ? this.props.account.get("label") : "";

    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm account deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete the account <strong>{accountLabel}</strong>?
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='danger' onClick={this.removeAccount}>Delete</Button>
            <Button onClick={this.close}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});

module.exports = DeleteAccountModal;
