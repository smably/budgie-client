'use strict';

var React = require('react/addons');

var Router = require('react-router');
var Link = Router.Link;

var Actions = require('actions/AccountActions');

var DollarView = require('components/DollarView');

var Account = React.createClass({
  editAccount: function() {
    if (this.props.data.id) {
      // TODO
      console.log("Editing is not yet implemented.");
    } else {
      console.log("Can't edit! No ID found for account.");
    }
  },

  render: function() {
    var account = this.props.data;

    var transactionsUrl = "/account/" + account.id + "/transactions";

    var accountInfo;
    if (account.hasExtraInfo) {
      accountInfo = [
        <td key={account.id + "-institutionName"}>{account.institutionName}</td>,
        <td key={account.id + "-typeAndNumber"}>{account.type} {account.number}</td>,
      ];
    } else {
      accountInfo = [
        <td key={account.id + "-noExtraInfo"} colSpan="2"></td>
      ];
    }

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
        {accountInfo}
        <td className="buttons"><button className="btn btn-xs btn-default" onClick={this.editAccount}>Edit</button></td>
      </tr>
    );
  }
});

module.exports = Account;
