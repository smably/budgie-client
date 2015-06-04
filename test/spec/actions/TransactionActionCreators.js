'use strict';

describe('TransactionActionCreators', function() {
  var action;

  beforeEach(function() {
    action = require('actions/TransactionActionCreators.js');
  });

  it('should be defined', function() {
    expect(action).toBeDefined();
  });
});
