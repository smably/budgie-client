'use strict';

var React = require('react/addons');

var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var Constants = require('constants/BaseConstants');

var TransactionForm = require('components/TransactionForm');

var CreateOrUpdateContent = React.createClass({
  getHeader: function() {
    var headerTitle;

    if (this.props.action === Constants.CRUD_ACTIONS.UPDATE) {
      headerTitle = "Edit Transaction";
    } else {
      headerTitle = "Add Transaction";
    }

    return (
      <Modal.Header>
        <Modal.Title>{headerTitle}</Modal.Title>
      </Modal.Header>
    );
  },

  getBody: function() {
    var activeTransaction;

    if (this.props.action === Constants.CRUD_ACTIONS.UPDATE) {
      activeTransaction = this.props.activeTransaction;
    }

    return (
      <Modal.Body>
        <TransactionForm ref="transactionForm" transaction={activeTransaction}/>
      </Modal.Body>
    );
  },

  getFooter: function() {
    var primaryButtonFunction;
    var primaryButtonText;

    if (this.props.action === Constants.CRUD_ACTIONS.UPDATE) {
      primaryButtonFunction = this.props.updateCallback;
      primaryButtonText = "Save";
    } else {
      primaryButtonFunction = this.props.createCallback;
      primaryButtonText = "Add Transaction";
    }

    return (
      <Modal.Footer>
        <Button bsStyle='primary' onClick={primaryButtonFunction}>{primaryButtonText}</Button>
        <Button onClick={this.props.closeCallback}>Cancel</Button>
      </Modal.Footer>
    );
  },

  render: function() {
    return (
      <div>
        {this.getHeader()}
        {this.getBody()}
        {this.getFooter()}
      </div>
    );
  }
});

module.exports = CreateOrUpdateContent;
