'use strict';

describe('TransactionStore', function() {
  var store;

  beforeEach(function() {
    store = require('stores/TransactionStore.js');
  });

  it('should be defined', function() {
    expect(store).toBeDefined();
  });
});
