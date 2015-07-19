'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var Button = require('react-bootstrap').Button;
var Link = Router.Link;

var AccountActions = require('actions/AccountActions');

var AccountStore = require('stores/AccountStore');

var AccountList = require('components/AccountList');
var AccountModal = require('components/AccountModal');
var DeleteAccountModal = require('components/DeleteAccountModal');

var AccountsView = React.createClass({
  mixins: [Reflux.connect(AccountStore, "accounts")],

  componentDidMount: function () {
    AccountActions.load();
  },

  getInitialState: function() {
    return { activeAccount: null };
  },

  updateActiveAccount: function(newActiveAccount) {
    this.setState({ activeAccount: newActiveAccount });
  },

  resetActiveAccount: function() {
    this.setState({ activeAccount: null });
  },

  openAddAccountModal: function() {
    this.resetActiveAccount();
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
    return (
      <div>
        <h3>Accounts</h3>

        <Button bsStyle='primary' onClick={this.openAddAccountModal}>
          <span className="glyphicon glyphicon-plus"></span> New Account
        </Button>

        <AccountList
          accounts={this.state.accounts}
          editCallback={this.openEditAccountModal}
          deleteCallback={this.openDeleteAccountModal}
        />

        <Link to="transactions">All Transactions</Link>

        <AccountModal ref='accountModal' account={this.state.activeAccount}/>
        <DeleteAccountModal ref='deleteAccountModal' account={this.state.activeAccount}/>
      </div>
    );
  }
});

module.exports = AccountsView;
