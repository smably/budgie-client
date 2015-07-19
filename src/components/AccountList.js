'use strict';

var React = require('react/addons');

var Button = require('react-bootstrap').Button;

var Account = require('components/Account');
var AccountModal = require('components/AccountModal');
var DeleteAccountModal = require('components/DeleteAccountModal');

var AccountList = React.createClass({
  getInitialState: function() {
    return { activeAccount: null };
  },

  updateActiveAccount: function(newActiveAccount) {
    this.setState({ activeAccount: newActiveAccount });
  },

  resetActiveAccount: function() {
    this.setState({ activeAccount: null });
  },

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
            editCallback={ function() { this.openEditAccountModal(account); }.bind(this) }
            deleteCallback={ function() { this.openDeleteAccountModal(account); }.bind(this) }/>
        );
      }.bind(this)).toArray();
    } else {
      accountRows = [
        <tr key="noAccountsFound">
          <td colSpan="8">No accounts found!</td>
        </tr>
      ];
    }

    return accountRows;
  },

  openAddAccountModal: function() {
    if (this.state.activeAccount) {
      this.resetActiveAccount();
    }

    this.refs.accountModal.open();
  },

  openEditAccountModal: function(account) {
    this.updateActiveAccount(account);
    this.refs.accountModal.open();
  },

  openDeleteAccountModal: function(account) {
    this.updateActiveAccount(account);
    this.refs.deleteAccountModal.open();
  },

  render: function() {
    var accountRows = this.renderAccountRows();

    return (
      <div>
        <Button bsStyle='primary' onClick={this.openAddAccountModal}>
          <span className="glyphicon glyphicon-plus"></span> New Account
        </Button>

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

        <AccountModal ref='accountModal' account={this.state.activeAccount}/>
        <DeleteAccountModal ref='deleteAccountModal' account={this.state.activeAccount}/>
      </div>
    );
  }
});

module.exports = AccountList;
