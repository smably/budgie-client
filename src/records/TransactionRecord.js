'use strict';

var Immutable = require('immutable');

var TransactionRecord = Immutable.Record({
  date: null,
  isReconciled: false,
  isRecurring: false,
  rrule: null,
  rdate: null,
  exdate: null,
  parentId: null,
  sortIndex: 0,
  amount: 0,
  sourceAccountId: null,
  destinationAccountId: null,
  label: null,
  notes: null,
  colour: null,
  tags: null
});

module.exports = TransactionRecord;
