'use strict';

var Immutable = require('immutable');

var AccountRecord = Immutable.Record({
  id: null,

  // Required fields
  label: null,
  isSource: false,
  isDestination: false,
  isPrimary: false,

  // Optional fields
  institutionName: null,
  accountType: null,
  accountNumber: null,
  initialBalance: 0
});

module.exports = AccountRecord;
