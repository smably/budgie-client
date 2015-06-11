'use strict';

var Reflux = require('reflux');

var Constants = require('constants/BaseConstants');

var Ajax = require('superagent');
var prefix = require('superagent-prefix')(Constants.API_BASE);

var AccountActions = Reflux.createActions([
  'load',
  'addAccount',
  'addAccountSuccess',
  'removeAccount',
  'removeAccountSuccess',
  'modifyAccount',
  'modifyAccountSuccess'
]);

AccountActions.addAccount.preEmit = function (account) {
  console.log("About to send out AJAX POST request for", account.toJS());

  Ajax.post('/accounts')
  .use(prefix)
  .send(account.toJS())
  .end(function (err, res) {
    if (err) {
      console.log("Account AJAX POST failed:", err);
      throw err;
    } else {
      console.log("Account AJAX POST succeeded:", res);

      AccountActions.addAccountSuccess(res.body);
    }
  });
};

AccountActions.removeAccount.preEmit = function (accountId) {
  console.log("About to send out AJAX DELETE request for", accountId);

  Ajax.del('/accounts/' + accountId)
  .use(prefix)
  .end(function (err, res) {
    if (err) {
      console.log("Account AJAX DELETE failed:", err);
    } else {
      console.log("Account AJAX DELETE succeeded:", res);

      AccountActions.removeAccountSuccess(accountId);
    }
  });
};

module.exports = AccountActions;
