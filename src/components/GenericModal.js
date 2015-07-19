'use strict';

var React = require('react/addons');
var Modal = require('react-bootstrap').Modal;
var Button = require('react-bootstrap').Button;

var Constants = require('constants/BaseConstants');

var DeleteContent = require('components/ModalContent/Delete');
var CreateOrUpdateContent = require('components/ModalContent/CreateOrUpdate');

var GenericModal = React.createClass({
  getInitialState: function() {
    return {
      showModal: false,
      action: Constants.CRUD_ACTIONS.CREATE,
      activeObject: null
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

  updateActiveObject: function(newActiveObject) {
    this.setState({ activeObject: newActiveObject });
  },

  render: function() {
    var modalContent;

    if (this.state.action === Constants.CRUD_ACTIONS.DELETE) {
      modalContent = (
        <DeleteContent
          objectType={this.props.objectType}
          activeObject={this.state.activeObject}
          closeCallback={this.close}
        />
      );
    } else {
      modalContent = (
        <CreateOrUpdateContent
          objectType={this.props.objectType}
          activeObject={this.state.activeObject}
          action={this.state.action}
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

module.exports = GenericModal;
