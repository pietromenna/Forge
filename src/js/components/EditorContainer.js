var React = require('react');

var ShowRulesButton = require('./ShowRulesButton');
var AddRuleButton = require('./AddRuleButton');
var RuleEditor = require('./RuleEditor');
var RulesDialog = require('./RulesDialog');

var EditorContainer = React.createClass({
  getInitialState: function () {
    return {
      showCurrentRules: false
    }
  },

  propTypes: {
    selectedNodePath: React.PropTypes.string,
    selectedNodeEl: React.PropTypes.object,
    rules: React.PropTypes.array,
    draft: React.PropTypes.object
  },

  _toggleRulesDialog: function () {
    this.setState(function(prev) {
      return {
        showCurrentRules: !prev.showCurrentRules
      };
    });
  },

  render: function () {
    var ruleEditor;

    if (this.props.draft) {
      ruleEditor = (
        <RuleEditor
          selectedNodeEl={ this.props.selectedNodeEl }
          draft={ this.props.draft }
          rules={ this.props.rules }
        />
      );
    }

    var currentRules;

    if (this.state.showCurrentRules) {
      currentRules = (
        <RulesDialog
          rules={ this.props.rules }
        />
      );
    }

    return (
      <div className={ 'editor-bar' }>
        <ShowRulesButton
          rules={ this.props.rules }
          showRules={ this.state.showCurrentRules }
          toggleRules={ this._toggleRulesDialog }
        />
        { currentRules }
        <AddRuleButton
          selectedNodePath={ this.props.selectedNodePath }
          draft={ this.props.draft }
        />
        { ruleEditor }
      </div>
    );
  }
});

module.exports = EditorContainer;
