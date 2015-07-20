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
          console.log("Error fetching accounts:", err);
        } else {
          var rawAccounts = JSON.parse(res.text);
          var accounts = Immutable.Map();

          if (rawAccounts && rawAccounts.length > 0) {
            accounts = accounts.withMutations(function(mutableAccounts) {
              rawAccounts.forEach(function(rawAccount) {
                mutableAccounts.set(rawAccount.id, new Account(rawAccount));
              });
            });
          }

          this.updateAccounts(accounts);
        }
      }.bind(this));
    } else {
      // Already fetched accounts
      this.trigger(this.accounts);
    }
  },

  onAddAccountSuccess: function(rawAccount) {
    this.updateAccounts(this.accounts.set(rawAccount.id, new Account(rawAccount)));
  },

  onRemoveAccountSuccess: function(accountId) {
    this.updateAccounts(this.accounts.delete(accountId));
  },

  onUpdateAccountSuccess: function(rawAccount) {
    this.updateAccounts(this.accounts.set(rawAccount.id, new Account(rawAccount)));
  },

  updateAccounts: function(accounts) {
    this.accounts = accounts;
    this.trigger(accounts);
  }

});

module.exports = AccountStore;
