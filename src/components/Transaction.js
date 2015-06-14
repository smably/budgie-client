'use strict';

var React = require('react/addons');

var Router = require('react-router');
var Link = Router.Link;

var Actions = require('actions/AccountActions');

var Transaction = React.createClass({
  removeAccount: function() {
    if (this.props.data.id) {
      Actions.removeAccount(this.props.data.id);
    } else {
      console.log("Can't delete! No ID found for account.");
    }
  },

  render: function() {
    var account = this.props.data;

    var transactionsUrl = "/account/" + account.id + "/transactions";

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
        <td>
          <Link to="accountTransactions" params={{id: account.id}}>{account.label}</Link>
        </td>
        <td>{account.isSource ? "x" : "-"}</td>
        <td>{account.isDestination ? "x" : "-"}</td>
        <td>{account.isPrimary ? "x" : "-"}</td>
        {accountInfo}
        <td><input type="button" value="-" onClick={this.removeAccount}/></td>
      </tr>
    );
  }
});

module.exports = Transaction;
