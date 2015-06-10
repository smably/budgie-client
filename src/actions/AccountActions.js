'use strict';

var Reflux = require('reflux');

var AccountActionCreators  =  Reflux.createActions([
  'load',
  'addAccount',
  'removeAccount',
  'updateAccount'
]);

module.exports = AccountActionCreators;
