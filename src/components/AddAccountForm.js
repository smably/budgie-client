'use strict';

var React = require('react/addons');

var Actions = require('actions/AccountActions');

var AccountRecord = require('records/AccountRecord');

var AddAccountForm = React.createClass({
  getInitialState: function() {
    return new AccountRecord().toJS();
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

    this.setState(changeset, this.updateHasExtraInfo);
  },

  updateHasExtraInfo: function() {
    var hasExtraInfo = false;
    if (this.state.institutionName || this.state.type || this.state.number) {
      hasExtraInfo = true;
    }

    this.setState({
      hasExtraInfo: hasExtraInfo
    });
  },

  addAccount: function() {
    console.log(this.state);

    var account = new AccountRecord(this.state);

    Actions.addAccount(account);
  },

  render: function() {
    return (
      <table><tbody>
        <tr>
          <td><input placeholder="Label" name="label" value={this.state.label} onChange={this.updateAccount}/></td>
        </tr>
        <tr>
          <td><input type="checkbox" name="isSource" checked={this.state.isSource} onChange={this.updateAccount}/></td>
        </tr>
        <tr>
          <td><input type="checkbox" name="isDestination" checked={this.state.isDestination} onChange={this.updateAccount}/></td>
        </tr>
        <tr>
          <td><input type="checkbox" name="isPrimary" checked={this.state.isPrimary} onChange={this.updateAccount}/></td>
        </tr>
        <tr>
          <td><input placeholder="Institution Name" name="institutionName" value={this.state.institutionName} onChange={this.updateAccount}/></td>
        </tr>
        <tr>
          <td>
            <input placeholder="Account Type" name="type" value={this.state.type} onChange={this.updateAccount}/>
            <input placeholder="Account Number" name="number" value={this.state.number} onChange={this.updateAccount}/>
          </td>
        </tr>
        <tr>
          <td>$0.00</td>
        </tr>
        <tr>
          <td><input type="submit" value="+" onClick={this.addAccount}/></td>
        </tr>
      </tbody></table>
    );
  }
});

module.exports = AddAccountForm;
