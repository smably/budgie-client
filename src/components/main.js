'use strict';

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var BudgieClientApp = require('components/BudgieClientApp');
var AccountsView = require('components/AccountsView');
var TransactionsView = require('components/TransactionsView');

require('styles/main.css');

var content = document.getElementById('content');

var Routes = (
  <Route handler={BudgieClientApp} path="/">
    <DefaultRoute handler={AccountsView}/>
    <Route path="accounts" handler={AccountsView} name="accounts"/>
    <Route path="account/:id/transactions" handler={TransactionsView} name="accountTransactions"/>
    <Route path="transactions" handler={TransactionsView} name="transactions"/>
  </Route>
);

// TODO switch to HistoryLocation
Router.run(Routes, Router.HashLocation, function(Handler, state) {
  React.render(<Handler {...state}/>, content);
});
