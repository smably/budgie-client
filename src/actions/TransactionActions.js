'use strict';

var Reflux = require('reflux');

var Constants = require('constants/BaseConstants');

var Ajax = require('superagent');
var prefix = require('superagent-prefix')(Constants.API_BASE);

var TransactionActions =  Reflux.createActions([
  'load',
  'addTransaction',
  'addTransactionSuccess',
  'removeTransaction',
  'removeTransactionSuccess',
  'updateTransaction',
  'updateTransactionSuccess'
]);

TransactionActions.addTransaction.preEmit = function (transaction) {
  console.log("About to send out AJAX POST request for", transaction.toJS());

  Ajax.post('/transactions')
  .use(prefix)
  .send(transaction.toJS())
  .end(function (err, res) {
    if (err) {
      console.log("Transaction AJAX POST failed:", err);
      throw err;
    } else {
      console.log("Transaction AJAX POST succeeded:", res);

      TransactionActions.addTransactionSuccess(res.body);
    }
  });
};

TransactionActions.removeTransaction.preEmit = function (transactionId) {
  console.log("About to send out AJAX DELETE request for", transactionId);

  Ajax.del('/transactions/' + transactionId)
  .use(prefix)
  .end(function (err, res) {
    if (err) {
      console.log("Transaction AJAX DELETE failed:", err);
    } else {
      console.log("Transaction AJAX DELETE succeeded:", res);

      TransactionActions.removeTransactionSuccess(transactionId);
    }
  });
};

module.exports = TransactionActions;
