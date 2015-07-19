'use strict';

var React = require('react/addons');

var Account = require('components/Account');

var AccountList = React.createClass({
  renderAccountRows: function() {
    var accountRows;

    if (this.props.accounts && this.props.accounts.size > 0) {
      var orderedAccounts = this.props.accounts.toOrderedSet().sort(
        function(a, b) {
          return a.id.localeCompare(b.id);
        }
      );

      accountRows = orderedAccounts.map(function(account) {
        return (
          <Account
            key={account.id}
            data={account}
            editCallback={ function() { this.props.editCallback(account); }.bind(this) }
            deleteCallback={ function() { this.props.deleteCallback(account); }.bind(this) }
          />
        );
      }.bind(this)).toArray();
    } else {
      accountRows = (
        <tr>
          <td colSpan="8">No accounts found!</td>
        </tr>
      );
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
            <th>Account Info</th>
            <th></th>
          </tr>
          {accountRows}
        </tbody>
      </table>
    );
  }
});

module.exports = AccountList;
