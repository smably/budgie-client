'use strict';

var Reflux = require('reflux');
var Actions = require('actions/TransactionActions');


var TransactionStore = Reflux.createStore({
  listenables: Actions,


});

module.exports = TransactionStore;
