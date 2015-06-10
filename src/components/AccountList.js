'use strict';

var React = require('react/addons');

// Actions
var AccountActions = require('actions/AccountActions');

// CSS
require('normalize.css');
require('styles/main.css');

var AccountList = React.createClass({
  componentDidMount: function () {
    AccountActions.load();
  },

  debug: function() {
    console.log(this.props);
  },

  renderAccountRows: function() {
    var accountRows = [];

    if (this.props.accounts) {
      this.props.accounts.forEach(function(account) {
        var accountInfo;
        if (account.hasExtraInfo) {
          accountInfo = [
            <td>{account.institutionName}</td>,
            <td>{account.type} {account.number}</td>,
            <td>{account.balance}</td>
          ];
        } else {
          accountInfo = [
            <td colSpan="3">n/a</td>
          ];
        }

        accountRows.push(
          <tr>
            <td>{account.label}</td>
            <td>{account.isSource ? "x" : "-"}</td>
            <td>{account.isDestination ? "x" : "-"}</td>
            <td>{account.isPrimary ? "x" : "-"}</td>
            {accountInfo}
          </tr>
        );
      });
    } else {
      accountRows.push(
        <tr>
          <td colspan="7">No accounts found!</td>
        </tr>
      );
    }

    return accountRows;
  },

  render: function() {
    var accountRows = this.renderAccountRows();

    return (
      <table className='main'>
        <tr>
          <th>Label</th>
          <th>Source</th>
          <th>Destination</th>
          <th>Primary</th>
          <th>Institution Name</th>
          <th>Account</th>
          <th>Balance</th>
        </tr>
        {accountRows}
      </table>
    );
  }
});

module.exports = AccountList;
