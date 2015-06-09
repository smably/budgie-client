'use strict';

var Reflux = require('reflux');

var TransactionActionCreators  =  Reflux.createActions([
  'load',
  'addTransaction',
  'removeTransaction',
  'updateTransaction'
]);

module.exports = TransactionActionCreators;
