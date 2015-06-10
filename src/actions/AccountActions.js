'use strict';

var Reflux = require('reflux');

var Constants = require('constants/BaseConstants');

var Ajax = require('superagent');
var prefix = require('superagent-prefix')(Constants.API_BASE);

var AccountActions = Reflux.createActions([
  'load',
  'addAccount',
  'removeAccount',
  'updateAccount'
]);

AccountActions.addAccount.preEmit = function (account) {
  console.log("About to send out AJAX request for", account.toJS());

  Ajax.post('/accounts')
  .use(prefix)
  .send(account.toJS())
  .end(function (err, res) {});
};

module.exports = AccountActions;
