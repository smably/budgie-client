'use strict';

var Reflux = require('reflux');
var Immutable = require('immutable');

var Actions = require('actions/AccountActions');
var Constants = require('constants/BaseConstants');
var Account = require('records/AccountRecord');

var Ajax = require('superagent');
var prefix = require('superagent-prefix')(Constants.API_BASE);

var AccountStore = Reflux.createStore({
  listenables: [Actions],

  accounts: null,

  init: function() {
    this.listenTo(Actions.load, this.fetchData);
  },

  fetchData: function() {
    if (this.accounts === null) {
      Ajax.get('/accounts')
      .use(prefix)
      .end(function(err, res) {
        if (err) {
          console.log("Error fetching:", err);
        } else {
          var rawAccounts = JSON.parse(res.text);
          var accounts = Immutable.Map();

          if (rawAccounts && rawAccounts.length > 0) {
            accounts = accounts.withMutations(function(mutableAccounts) {
              rawAccounts.forEach(function(account) {
                mutableAccounts.set(account.id, account);
              });
            });
          }

          this.updateAccounts(accounts);
        }
      }.bind(this));
    } else {
      this.trigger(this.accounts);
    }
  },

  onAddAccountSuccess: function(account) {
    this.updateAccounts(this.accounts.set(account.id, account));
  },

  onRemoveAccountSuccess: function(accountId) {
    this.updateAccounts(this.accounts.delete(accountId));
  },

  updateAccounts: function(accounts) {
    this.accounts = accounts;
    this.trigger(accounts);
  }

});

module.exports = AccountStore;
