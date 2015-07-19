'use strict';

var React = require('react/addons');

var Router = require('react-router');
var Link = Router.Link;

var Actions = require('actions/AccountActions');

var DollarView = require('components/DollarView');

var Account = React.createClass({
  editAccount: function() {
    if (this.props.editCallback) {
      this.props.editCallback();
    }
  },

  deleteAccount: function() {
    if (this.props.deleteCallback) {
      this.props.deleteCallback();
    }
  },

  render: function() {
    var account = this.props.data;

    var checkmark = (
      <span className="glyphicon glyphicon-ok"></span>
    );

    return (
      <tr>
        <td>
          <Link to="accountTransactions" params={{id: account.id}}>{account.label}</Link>
        </td>
        <td className="boolean">{account.isSource ? checkmark : ""}</td>
        <td className="boolean">{account.isDestination ? checkmark : ""}</td>
        <td className="boolean">{account.isPrimary ? checkmark : ""}</td>
        <td>{account.institutionName}</td>,
        <td>{account.accountType} {account.accountNumber}</td>,
        <td className="buttons">
          <span className="glyphicon glyphicon-pencil" onClick={this.editAccount}></span>
          <span className="glyphicon glyphicon-remove" onClick={this.deleteAccount}></span>
        </td>
      </tr>
    );
  }
});

module.exports = Account;
