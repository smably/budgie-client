'use strict';

var Immutable = require('immutable');

var AccountRecord = Immutable.Record({
  id: null,
  label: null,
  isSource: false,
  isDestination: false,
  isPrimary: false,
  hasExtraInfo: false,
  institutionName: null,
  type: null,
  number: null,
  balance: 0,
  balanceDate: null
});

module.exports = AccountRecord;
