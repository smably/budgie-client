'use strict';

var React = require('react/addons');

var Actions = require('actions/AccountActions');

var Account = React.createClass({
  removeAccount: function() {
    if (this.props.data.id) {
      Actions.removeAccount(this.props.data.id);
    } else {
      console.log("Can't delete! No ID found for account.");
    }
  },

  render: function() {
    var account = this.props.data;

    var accountInfo;
    if (account.hasExtraInfo) {
      accountInfo = [
        <td key={account.id + "-institutionName"}>{account.institutionName}</td>,
        <td key={account.id + "-typeAndNumber"}>{account.type} {account.number}</td>,
        <td key={account.id + "-balance"}>{account.balance}</td>
      ];
    } else {
      accountInfo = [
        <td key={account.id + "-noExtraInfo"} colSpan="3">n/a</td>
      ];
    }

    return (
      <tr>
        <td>{account.label}</td>
        <td>{account.isSource ? "x" : "-"}</td>
        <td>{account.isDestination ? "x" : "-"}</td>
        <td>{account.isPrimary ? "x" : "-"}</td>
        {accountInfo}
        <td><input type="button" value="-" onClick={this.removeAccount}/></td>
      </tr>
    );
  }
});

module.exports = Account;
