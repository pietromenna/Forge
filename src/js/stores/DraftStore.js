var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var DraftConstants = require('../constants/DraftConstants');

var CHANGE_EVENT = 'change';

var _draft = {};

var create = function (target) {
  _draft = {
    target: target,
    name: '',
    data: {}
  };
};

var updateName = function (name) {
  _draft.name = name;
};

var addDataItem = function (item) {
  _draft.data[item['attribute']] = item['value'];
};

var removeDataItem = function (attribute) {
  delete _draft.data[attribute];
};

var destroy = function () {
  _draft = {};
};

var DraftStore = assign({}, EventEmitter.prototype, {
  getDraft: function() {
    return _draft;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (action) {
  switch (action.actionType) {
    case DraftConstants.DRAFT_CREATE:
      if (action.target) {
        create(action.target);
      }
      DraftStore.emitChange();
      break;

    case DraftConstants.DRAFT_DESTROY:
      destroy();
      DraftStore.emitChange();
      break;

    case DraftConstants.DRAFT_ADD_DATA_ITEM:
      if (!_.isEmpty(action.attribute) && !_.isEmpty(action.value)) {
        addDataItem({
          attribute: action.attribute,
          value: action.value
        });
        DraftStore.emitChange();
      }
      break;

    case DraftConstants.DRAFT_REMOVE_DATA_ITEM:
      if (!_.isEmpty(action.attribute)) {
        removeDataItem(action.attribute);
        DraftStore.emitChange();
      }
      break;

    case DraftConstants.DRAFT_UPDATE_NAME:
      updateName(action.name);
      DraftStore.emitChange();
      break;

    default:
      // no-op
  }
});

module.exports = DraftStore;
