'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var Button = require('react-bootstrap').Button;
var Glyphicon = require('react-bootstrap').Glyphicon;
var Link = Router.Link;

var Constants = require('constants/BaseConstants');

var AccountActions = require('actions/AccountActions');

var AccountStore = require('stores/AccountStore');

var AccountList = require('components/AccountList');
var GenericModal = require('components/GenericModal');

var AccountsView = React.createClass({
  mixins: [Reflux.connect(AccountStore, "accounts")],

  componentDidMount: function () {
    AccountActions.load();
  },

  openAddAccountModal: function() {
    this.refs.accountModal.updateAction(Constants.CRUD_ACTIONS.CREATE);
    this.refs.accountModal.open();
  },

  openEditAccountModal: function(account) {
    this.refs.accountModal.updateAction(Constants.CRUD_ACTIONS.UPDATE);
    this.refs.accountModal.updateActiveObject(account);
    this.refs.accountModal.open();
  },

  openDeleteAccountModal: function(account) {
    this.refs.accountModal.updateAction(Constants.CRUD_ACTIONS.DELETE);
    this.refs.accountModal.updateActiveObject(account);
    this.refs.accountModal.open();
  },

  render: function() {
    return (
      <div>
        <h3>Accounts</h3>

        <Button bsStyle='primary' onClick={this.openAddAccountModal}>
          <Glyphicon glyph="plus"/> New Account
        </Button>

        <AccountList
          accounts={this.state.accounts}
          editCallback={this.openEditAccountModal}
          deleteCallback={this.openDeleteAccountModal}
        />

        <Link to="transactions">All Transactions</Link>

        <GenericModal ref='accountModal' objectType={Constants.OBJECT_TYPES.ACCOUNT}/>
      </div>
    );
  }
});

module.exports = AccountsView;
