'use strict';

var React = require('react/addons');

var Actions = require('actions/TransactionActions');

var TransactionRecord = require('records/TransactionRecord');

var AddTransactionForm = React.createClass({
  getInitialState: function() {
    return {
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
    };
  },

  updateTransaction: function(event) {
    var key = event.target.name;
    var val;

    if (event.target.type === "checkbox" || event.target.type === "radio") {
      val = event.target.checked;
    } else {
      val = event.target.value === "" ? null : event.target.value;
    }

    var changeset = {};
    changeset[key] = val;

    this.setState(changeset, this.updateHasExtraInfo);
  },

  addTransaction: function() {
    console.log(this.state);

    var transaction = new TransactionRecord(this.state);

    Actions.addTransaction(transaction);
  },

  render: function() {
    var balanceCell;

    if (this.props.hasBalance) {
      balanceCell = (
        <td></td>
      );
    }

    return (
      <tr>
        <td><input placeholder="Date" name="date" value={this.state.date} onChange={this.updateTransaction}/></td>
        <td><input placeholder="Label" name="label" value={this.state.label} onChange={this.updateTransaction}/></td>
        <td><input placeholder="Amount" name="amount" value={this.state.amount} onChange={this.updateTransaction}/></td>
        <td><input placeholder="From Account (ID)" name="sourceAccountId" value={this.state.sourceAccountId} onChange={this.updateTransaction}/></td>
        <td><input placeholder="To Account (ID)" name="destinationAccountId" value={this.state.destinationAccountId} onChange={this.updateTransaction}/></td>
        {balanceCell}
        <td><input type="submit" value="+" onClick={this.addTransaction}/></td>
      </tr>
    );
  }
});

module.exports = AddTransactionForm;
