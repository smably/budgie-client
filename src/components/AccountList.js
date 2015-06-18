'use strict';

var React = require('react/addons');

var AccountActions = require('actions/AccountActions');

var Account = require('components/Account');
var AddAccountForm = require('components/AddAccountForm');

var AccountList = React.createClass({
  componentDidMount: function () {
    AccountActions.load();
  },

  renderAccountRows: function() {
    var accountRows = [];

    console.log("in renderAccountRows, this.props.accounts=", this.props.accounts);

    if (this.props.accounts && this.props.accounts.length > 0) {
      this.props.accounts.forEach(function(account) {
        accountRows.push(
          <Account key={account.id} data={account}/>
        );
      });
    } else {
      accountRows = [
        <tr key="noAccountsFound">
          <td colSpan="8">No accounts found!</td>
        </tr>
      ];
    }

    return accountRows;
  },

  render: function() {
    var accountRows = this.renderAccountRows();

    return (
      <table className='main'>
        <tbody>
          <tr>
            <th>Label</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Primary</th>
            <th>Institution Name</th>
            <th>Account</th>
            <th>Balance</th>
            <th>+/-</th>
          </tr>
          {accountRows}
          <AddAccountForm/>
        </tbody>
      </table>
    );
  }
});

module.exports = AccountList;
