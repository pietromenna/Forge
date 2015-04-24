var React = require('react');

var ShowRulesButton = require('./ShowRulesButton');
var AddRuleButton = require('./AddRuleButton');
var RuleEditor = require('./RuleEditor');

var EditorContainer = React.createClass({
  propTypes: {
    selectedNodePath: React.PropTypes.string,
    selectedNodeEl: React.PropTypes.object,
    rules: React.PropTypes.array,
    draft: React.PropTypes.object
  },

  render: function () {
    var ruleEditor;

    if (this.props.draft) {
      ruleEditor = (
        <RuleEditor
          selectedNodeEl={ this.props.selectedNodeEl }
          draft={ this.props.draft }
        />
      );
    }

    return (
      <div className={ 'editor-bar' }>
        <ShowRulesButton
          rules={ this.props.rules }
        />
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
