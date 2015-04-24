var AppDispatcher = require('../dispatcher/AppDispatcher');
var RuleConstants = require('../constants/RuleConstants');

var RuleActions = {
  create: function (draft) {
    AppDispatcher.dispatch({
      actionType: RuleConstants.RULE_CREATE,
      rule: draft
    });
  },

  destroy: function (target) {
    AppDispatcher.dispatch({
      actionType: RuleConstants.RULE_DESTROY,
      target: target
    });
  }
};

module.exports = RuleActions;
