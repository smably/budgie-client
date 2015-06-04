'use strict';

var Reflux = require('reflux');
var Actions = require('actions/TransactionActionCreators');


var TransactionStore = Reflux.createStore({
  listenables: Actions,


});

module.exports = TransactionStore;
