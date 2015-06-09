'use strict';

var React = require('react/addons');

// Stores
var AccountStore = require('stores/AccountStore');
var TransactionStore = require('stores/TransactionStore');

// CSS
require('normalize.css');
require('styles/main.css');

var BudgieClientApp = React.createClass({
  fetchData: function() {
    AccountStore.fetchData();
  },

  render: function() {
    return (
      <div className='main' onClick={this.fetchData}>
        Hello Budgie.
      </div>
    );
  }
});

module.exports = BudgieClientApp;
