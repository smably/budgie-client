'use strict';

var Immutable = require('immutable');

var TransactionOccurrenceRecord = Immutable.Record({
  id: null,
  date: null,
  transactionId: null,
  parentTransactionId: null,

  amount: 0,
  sourceAccountId: null,
  destinationAccountId: null,
  isReconciled: false,
  label: null,
  notes: null,
  colour: null,
  tags: null,

  isException: false,
  isExcluded: false,
  recurrenceIndex: 0
});

module.exports = TransactionOccurrenceRecord;
