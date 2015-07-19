'use strict';

var React = require('react/addons');

var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var Constants = require('constants/BaseConstants');
var AccountActions = require('actions/AccountActions');
var TransactionActions = require('actions/TransactionActions');

var DeleteContent = React.createClass({
  remove: function() {
    var objectId = this.props.activeObject.get("id");

    if (this.props.objectType === Constants.OBJECT_TYPES.ACCOUNT) {
      AccountActions.removeAccount(objectId);
    } else {
      TransactionActions.removeTransaction(objectId);
    }

    this.props.closeCallback();
  },

  render: function() {
    var objectName;

    if (this.props.objectType === Constants.OBJECT_TYPES.ACCOUNT) {
      objectName = "account";
    } else {
      objectName = "transaction";
    }

    var objectLabel = this.props.activeObject ?
      this.props.activeObject.get("label") :
      "";

    return (
      <div>
        <Modal.Header>
          <Modal.Title>Confirm {objectName} deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the {objectName} <strong>{objectLabel}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='danger' onClick={this.remove}>Delete</Button>
          <Button onClick={this.props.closeCallback}>Cancel</Button>
        </Modal.Footer>
      </div>
    );
  }
});

module.exports = DeleteContent;
