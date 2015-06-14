'use strict';

var React = require('react/addons');

var Router = require('react-router');
var RouteHandler = Router.RouteHandler;

require('normalize.css');
require('styles/main.css');

var BudgieClientApp = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Budgie</h1>
        <RouteHandler {...this.props}/>
      </div>
    );
  }
});

module.exports = BudgieClientApp;
