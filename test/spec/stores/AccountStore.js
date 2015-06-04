'use strict';

describe('AccountStore', function() {
  var store;

  beforeEach(function() {
    store = require('stores/AccountStore.js');
  });

  it('should be defined', function() {
    expect(store).toBeDefined();
  });
});
