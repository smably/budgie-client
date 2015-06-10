'use strict';

var React = require('react/addons');

var Account = React.createClass({
  deleteAccount: function() {
    window.alert("TODO");
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
        <td><input type="button" value="-" onClick={this.deleteAccount}/></td>
      </tr>
    );
  }
});

module.exports = Account;
