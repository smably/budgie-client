'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = Router.Link;

var AccountActions = require('actions/AccountActions');

var AccountStore = require('stores/AccountStore');

var AccountList = require('components/AccountList');

var AccountsView = React.createClass({
  mixins: [Reflux.connect(AccountStore, "accounts")],

  componentDidMount: function () {
    AccountActions.load();
  },

  render: function() {
    return (
      <div>
        <h3>Accounts</h3>
        <AccountList accounts={this.state.accounts} />
        <Link to="transactions">All Transactions</Link>
      </div>
    );
  }
});

module.exports = AccountsView;
