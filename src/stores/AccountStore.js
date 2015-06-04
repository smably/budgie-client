'use strict';

var Reflux = require('reflux');
var Actions = require('actions/AccountActionCreators');


var AccountStore = Reflux.createStore({
  listenables: Actions,


});

module.exports = AccountStore;
