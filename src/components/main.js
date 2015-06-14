'use strict';

var React = require('react');

var Router = require('react-router');
var DefaultRoute = Router.DefaultRoute;
var Route = Router.Route;

var BudgieClientApp = require('components/BudgieClientApp');
var AccountsView = require('components/AccountsView');
var TransactionsView = require('components/TransactionsView');
var AccountTransactionsView = require('components/AccountTransactionsView');

require('normalize.css');
require('styles/main.css');

var content = document.getElementById('content');

var Routes = (
  <Route handler={BudgieClientApp} path="/">
    <DefaultRoute handler={AccountsView}/>
    <Route path="accounts" handler={AccountsView} name="accounts"/>
    <Route path="account/:id/transactions" handler={AccountTransactionsView} name="accountTransactions"/>
    <Route path="transactions" handler={TransactionsView} name="transactions"/>
  </Route>
);

// TODO switch to HistoryLocation
Router.run(Routes, Router.HashLocation, function (Handler) {
  React.render(<Handler/>, content);
});
