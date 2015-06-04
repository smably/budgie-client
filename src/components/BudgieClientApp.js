'use strict';

var React = require('react/addons');

// Stores
require('../stores/AccountStore');
require('../stores/TransactionStore');

// CSS
require('normalize.css');
require('../styles/main.css');

var BudgieClientApp = React.createClass({
  render: function() {
    return (
      <div className='main'>
        Hello Budgie.
      </div>
    );
  }
});

module.exports = BudgieClientApp;
