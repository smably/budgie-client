'use strict';

var React = require('react/addons');

var Actions = require('actions/AccountActions');

var AccountRecord = require('records/AccountRecord');

var AccountForm = React.createClass({
  getInitialState: function() {
    return this.props.account ? this.props.account.toJS() : new AccountRecord().toJS();
  },

  updateAccount: function(event) {
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
    Actions.addAccount(new AccountRecord(this.state));
  },

  save: function() {
    Actions.updateAccount(new AccountRecord(this.state));
  },

  render: function() {
    return (
      <table><tbody>
        <tr>
          <td>Label</td>
          <td><input name="label" value={this.state.label} onChange={this.updateAccount}/></td>
        </tr>
        <tr>
          <td>Source</td>
          <td><input type="checkbox" name="isSource" checked={this.state.isSource} onChange={this.updateAccount}/></td>
        </tr>
        <tr>
          <td>Destination</td>
          <td><input type="checkbox" name="isDestination" checked={this.state.isDestination} onChange={this.updateAccount}/></td>
        </tr>
        <tr>
          <td>Primary</td>
          <td><input type="checkbox" name="isPrimary" checked={this.state.isPrimary} onChange={this.updateAccount}/></td>
        </tr>
        <tr>
          <td>Institution Name</td>
          <td><input name="institutionName" value={this.state.institutionName} onChange={this.updateAccount}/></td>
        </tr>
        <tr>
          <td>Account Type (e.g., checking, savings)</td>
          <td><input name="accountType" value={this.state.accountType} onChange={this.updateAccount}/></td>
        </tr>
        <tr>
          <td>Account Number</td>
          <td><input name="accountNumber" value={this.state.accountNumber} onChange={this.updateAccount}/></td>
        </tr>
        <tr>
          <td>Initial Balance</td>
          <td><input name="initialBalance" value={this.state.initialBalance} onChange={this.updateAccount}/></td>
        </tr>
      </tbody></table>
    );
  }
});

module.exports = AccountForm;
