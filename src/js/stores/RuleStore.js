var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash');

var AppDispatcher = require('../dispatcher/AppDispatcher');
var RuleConstants = require('../constants/RuleConstants');

var CHANGE_EVENT = 'change';

var _rules = {};

var create = function (rule) {
  _rules[rule.target] = rule;
};

var destroy = function (rule) {
  delete _rules[rule.target];
};

var RuleStore = assign({}, EventEmitter.prototype, {
  getRule: function (target) {
    return _rules[target];
  },

  getAllRules: function () {
    return _.values(_rules);
  },

  emitChange: function () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function (callback) {
    this.on(CHANGE_EVENT, callback);
  }
});

AppDispatcher.register(function (action) {
  var rule;

  switch (action.actionType) {
    case RuleConstants.RULE_CREATE:
      rule = action.rule;
      if (rule && rule.target) {
        create(rule);
        RuleStore.emitChange();
      }
      break;
    case RuleConstants.RULE_DESTROY:
      if (rule && rule.target) {
        destroy(rule);
        RuleStore.emitChange();
      }
      break;
    default:
      // no-op
  }
});

module.exports = RuleStore;
