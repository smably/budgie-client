'use strict';

var BaseConstants = {
  API_BASE: "http://localhost:3000/api",

  CRUD_ACTIONS: {
    CREATE: "CREATE",
    READ: "READ",
    UPDATE: "UPDATE",
    DELETE: "DELETE"
  },

  OBJECT_TYPES: {
    ACCOUNT: {
      EDIT_TEXT: "Edit Account",
      ADD_TEXT: "Add Account"
    },
    TRANSACTION: {
      EDIT_TEXT: "Edit Transaction",
      ADD_TEXT: "Add Transaction"
    }
  },

  // TODO
  STRINGS: {
  }
};

module.exports = BaseConstants;
