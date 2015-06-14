'use strict';

var React = require('react/addons');
var Reflux = require('reflux');
var Router = require('react-router');
var Link = Router.Link;

var AccountStore = require('stores/AccountStore');

var AccountList = require('components/AccountList');

var AccountsView = React.createClass({
  mixins: [Reflux.connect(AccountStore, "accounts")],

  render: function() {
    return (
      <div>
        <h2>Accounts</h2>
        <AccountList accounts={this.state.accounts} />
        <h2>Transactions</h2>
        <Link to="transactions">All transactions</Link>
      </div>
    );
  }
});

module.exports = AccountsView;
