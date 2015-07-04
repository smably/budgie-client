'use strict';

var React = require('react/addons');

var DollarView = React.createClass({
  render: function() {
    var cents = this.props.amount;

    var isNegative = this.props.isNegative;

    if (cents < 0) {
      cents *= -1;
      isNegative = !isNegative;
    }

    var sign = isNegative ? "-" : "";
    var printDollars = (cents / 100).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    var balanceColor = isNegative ? "#880000" : "#008800";

    return (
      <div style={{color: balanceColor}}>
        {sign}${printDollars}
      </div>
    );
  }
});

module.exports = DollarView;
