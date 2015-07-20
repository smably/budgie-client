'use strict';

var Immutable = require('immutable');

var TransactionRecord = Immutable.Record({
  id: null,

  // Core fields
  dtstart: null,
  sortIndex: 0,
  amount: 0,
  sourceAccountId: null,
  destinationAccountId: null,

  // Recurrence/Inheritance Fields
  rrule: null,
  exdate: null,
  parentId: null,

  // Metadata fields
  isReconciled: false,
  label: null,
  notes: null,
  colour: null,
  tags: null,
});

module.exports = TransactionRecord;
