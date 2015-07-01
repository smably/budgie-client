'use strict';

var React = require('react/addons');

var DollarView = React.createClass({
  render: function() {
    var cents = this.props.amount;
    var printDollars = (cents / 100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

    return (
      <div>
        ${printDollars}
      </div>
    );
  }
});

module.exports = DollarView;
