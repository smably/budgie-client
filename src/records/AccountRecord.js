'use strict';

var Immutable = require('immutable');

var AccountRecord = Immutable.Record({
  label: null,
  isSource: false,
  isDestination: false,
  isPrimary: false,
  accountInfo: {
    institutionName: null,
    accountType: null,
    accountNumber: null,
    balance: 0,
    balanceDate: null
  }
});

module.exports = AccountRecord;
