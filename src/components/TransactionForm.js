'use strict';

var React = require('react/addons');

var Actions = require('actions/TransactionActions');

var TransactionRecord = require('records/TransactionRecord');

var TransactionForm = React.createClass({
  getInitialState: function() {
    return this.props.transaction ? this.props.transaction.toJS() : new TransactionRecord().toJS();
  },

  updateTransaction: function(event) {
    var key = event.target.name;
    var val;

    if (event.target.type === "checkbox" || event.target.type === "radio") {
      val = event.target.checked;
    } else {
      val = event.target.value === "" ? null : event.target.value;
    }

    var changeset = {};
    changeset[key] = val;

    this.setState(changeset);
  },

  add: function() {
    Actions.addTransaction(new TransactionRecord(this.state));
  },

  save: function() {
    Actions.updateTransaction(new TransactionRecord(this.state));
  },

  render: function() {
    return (
      <table><tbody>
        <tr>
          <td>Label</td>
          <td><input name="label" value={this.state.label} onChange={this.updateTransaction}/></td>
        </tr>
        <tr>
          <td>Amount</td>
          <td><input name="amount" value={this.state.amount} onChange={this.updateTransaction}/></td>
        </tr>
        <tr>
          <td>Source Account</td>
          <td><input name="sourceAccountId" value={this.state.sourceAccountId} onChange={this.updateTransaction}/></td>
        </tr>
        <tr>
          <td>Destination Account</td>
          <td><input name="destinationAccountId" value={this.state.destinationAccountId} onChange={this.updateTransaction}/></td>
        </tr>
        <tr>
          <td>Start Date</td>
          <td><input name="dtstart" value={this.state.dtstart} onChange={this.updateTransaction}/></td>
        </tr>

        <tr>
          <td>Sort Index</td>
          <td><input name="sortIndex" value={this.state.sortIndex} onChange={this.updateTransaction}/></td>
        </tr>
        <tr>
          <td>Recurrence Rule</td>
          <td><input name="rrule" value={this.state.rrule} onChange={this.updateTransaction}/></td>
        </tr>
      </tbody></table>
    );
  }
});

module.exports = TransactionForm;
