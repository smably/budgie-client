'use strict';

var React = require('react/addons');

var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var AccountRecord = require('records/AccountRecord');

var AccountForm = require('components/AccountForm');

var AccountModal = React.createClass({
  saveAccount: function(event) {
    this.refs.addAccountForm.saveAccount();
    this.close();
  },

  addAccount: function() {
    this.refs.addAccountForm.addAccount();
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

  getHeader: function() {
    var headerTitle;

    if (this.props.account) {
      headerTitle = "Edit Account";
    } else {
      headerTitle = "Add Account";
    }

    return (
      <Modal.Header closeButton>
        <Modal.Title>{headerTitle}</Modal.Title>
      </Modal.Header>
    );
  },

  getFooter: function() {
    var primaryButtonFunction;
    var primaryButtonText;

    if (this.props.account) {
      primaryButtonFunction = this.saveAccount;
      primaryButtonText = "Save";
    } else {
      primaryButtonFunction = this.addAccount;
      primaryButtonText = "Add Account";
    }

    return (
      <Modal.Footer>
        <Button bsStyle='primary' onClick={primaryButtonFunction}>{primaryButtonText}</Button>
        <Button onClick={this.close}>Close</Button>
      </Modal.Footer>
    );
  },

  render: function() {
    return (
      <div>
        <Modal show={this.state.showModal} onHide={this.close}>
          {this.getHeader()}
          <Modal.Body>
            <AccountForm ref="addAccountForm" account={this.props.account}/>
          </Modal.Body>
          {this.getFooter()}
        </Modal>
      </div>
    );
  }
});

module.exports = AccountModal;
