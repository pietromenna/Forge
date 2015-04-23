var AppDispatcher = require('../dispatcher/AppDispatcher');
var DraftConstants = require('../constants/DraftConstants');

var DraftActions = {
  create: function (target) {
    AppDispatcher.dispatch({
      actionType: DraftConstants.DRAFT_CREATE,
      target: target
    });
  },

  destroy: function () {
    AppDispatcher.dispatch({
      actionType: DraftConstants.DRAFT_DESTROY
    });
  },

  addData: function (attribute, value) {
    AppDispatcher.dispatch({
      actionType: DraftConstants.DRAFT_ADD_DATA_ITEM,
      attribute: attribute,
      value: value
    });
  },

  removeData: function (attribute) {
    AppDispatcher.dispatch({
      actionType: DraftConstants.DRAFT_REMOVE_DATA_ITEM,
      attribute: attribute
    });
  },

  updateName: function (name) {
    AppDispatcher.dispatch({
      actionType: DraftConstants.DRAFT_UPDATE_NAME,
      name: name
    });
  }
};

module.exports = DraftActions;
