'use strict';

var React = require('react/addons');
var Reflux = require('reflux');

// Stores
var AccountStore = require('stores/AccountStore');

// Components
var AccountList = require('components/AccountList');

// CSS
require('normalize.css');
require('styles/main.css');

var BudgieClientApp = React.createClass({
  mixins: [Reflux.connect(AccountStore, "accounts")],

  render: function() {
    return (
      <AccountList accounts={this.state.accounts} />
    );
  }
});

module.exports = BudgieClientApp;
