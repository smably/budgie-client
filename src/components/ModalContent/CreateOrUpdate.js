'use strict';

var React = require('react/addons');

var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var Constants = require('constants/BaseConstants');

var AccountForm = require('components/AccountForm');
var TransactionForm = require('components/TransactionForm');

var CreateOrUpdateContent = React.createClass({
  save: function() {
    this.refs.form.save();
    this.props.closeCallback();
  },

  add: function() {
    this.refs.form.add();
    this.props.closeCallback();
  },

  getHeader: function() {
    var headerTitle;

    if (this.props.action === Constants.CRUD_ACTIONS.UPDATE) {
      headerTitle = this.props.objectType.EDIT_TEXT;
    } else {
      headerTitle = this.props.objectType.ADD_TEXT;
    }

    return (
      <Modal.Header>
        <Modal.Title>{headerTitle}</Modal.Title>
      </Modal.Header>
    );
  },

  getBody: function() {
    var form;
    var activeObject;

    if (this.props.action === Constants.CRUD_ACTIONS.UPDATE) {
      activeObject = this.props.activeObject;
    }

    if (this.props.objectType === Constants.OBJECT_TYPES.ACCOUNT) {
      form = (
        <AccountForm ref="form" account={activeObject}/>
      );
    } else {
      form = (
        <TransactionForm ref="form" transaction={activeObject}/>
      );
    }

    return (
      <Modal.Body>
        {form}
      </Modal.Body>
    );
  },

  getFooter: function() {
    var primaryButtonFunction;
    var primaryButtonText;

    if (this.props.action === Constants.CRUD_ACTIONS.UPDATE) {
      primaryButtonFunction = this.save;
      primaryButtonText = "Save";
    } else {
      primaryButtonFunction = this.add;
      primaryButtonText = "Add";
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
