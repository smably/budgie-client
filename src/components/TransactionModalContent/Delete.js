'use strict';

var React = require('react/addons');

var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var DeleteContent = React.createClass({
  render: function() {
    return (
      <div>
        <Modal.Header>
          <Modal.Title>Confirm transaction deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the transaction <strong>{this.props.transactionLabel}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='danger' onClick={this.props.deleteCallback}>Delete</Button>
          <Button onClick={this.props.closeCallback}>Cancel</Button>
        </Modal.Footer>
      </div>
    );
  }
});

module.exports = DeleteContent;
