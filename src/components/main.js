'use strict';

var BudgieClientApp = require('./BudgieClientApp');
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;

var content = document.getElementById('content');

var Routes = (
  <Route handler={BudgieClientApp}>
    <Route name="/" handler={BudgieClientApp}/>
  </Route>
);

Router.run(Routes, function (Handler) {
  React.render(<Handler/>, content);
});
