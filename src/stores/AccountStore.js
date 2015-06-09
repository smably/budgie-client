'use strict';

var Reflux = require('reflux');

var Actions = require('actions/AccountActionCreators');
var Constants = require('constants/BaseConstants');
var Account = require('records/AccountRecord');

var Ajax = require('superagent');
var prefix = require('superagent-prefix')(Constants.API_BASE);

var AccountStore = Reflux.createStore({
  listenables: Actions,

  accountList: [],

  fetchData: function() {
    var scope = this;

    Ajax.get('/accounts')
    .use(prefix)
    .end(function(err, res) {
      if (err) {
        console.log("Error fetching:", err);
      } else {
        var accounts = JSON.parse(res.text);

        console.log("Got accounts:", accounts);

        accounts.map(function (account) {
          scope.accountList.push(new Account(account));
        });

        console.log(scope.accountList[0]);
      }
    });
  }

});

module.exports = AccountStore;
