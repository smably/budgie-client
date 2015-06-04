'use strict';

describe('BudgieClientApp', function () {
  var React = require('react/addons');
  var BudgieClientApp, component;

  beforeEach(function () {
    var container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    BudgieClientApp = require('components/BudgieClientApp.js');
    component = React.createElement(BudgieClientApp);
  });

  it('should create a new instance of BudgieClientApp', function () {
    expect(component).toBeDefined();
  });
});
