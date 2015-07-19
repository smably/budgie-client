'use strict';

var React = require('react/addons');

var Actions = require('actions/TransactionActions');

var TransactionRecord = require('records/TransactionRecord');

var TransactionForm = React.createClass({
  getInitialState: function() {
    return this.props.transaction ? this.props.transaction.toJS() : new TransactionRecord().toJS();
  },

  render: function() {
    return (
      <div>TODO {this.state.label ? "(" + this.state.label + ")" : ""}</div>
    );
  }
});

module.exports = TransactionForm;
