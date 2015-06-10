'use strict';

var Reflux = require('reflux');

var Actions = require('actions/AccountActions');
var Constants = require('constants/BaseConstants');
var Account = require('records/AccountRecord');

var Ajax = require('superagent');
var prefix = require('superagent-prefix')(Constants.API_BASE);

var AccountStore = Reflux.createStore({
  listenables: [Actions],

  accounts: [],

  init: function() {
    this.listenTo(Actions.load, this.fetchData);
  },

  fetchData: function() {
    Ajax.get('/accounts')
    .use(prefix)
    .end(function(err, res) {
      if (err) {
        console.log("Error fetching:", err);
      } else {
        var rawAccounts = JSON.parse(res.text);
        var accounts = [];

        // FIXME
        //console.log("Got accounts:", rawAccounts);

        rawAccounts.map(function (account) {
          accounts.push(new Account(account));
        });

        this.accounts = accounts;
        this.trigger(this.accounts);
      }
    }.bind(this));
  }

});

module.exports = AccountStore;
