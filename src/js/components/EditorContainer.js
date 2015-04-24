var React = require('react');

var AddRuleButton = require('./AddRuleButton');
var RuleEditor = require('./RuleEditor');

var EditorContainer = React.createClass({
  propTypes: {
    selectedNodePath: React.PropTypes.string,
    selectedNodeEl: React.PropTypes.object,
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
        <AddRuleButton
          selectedNodePath={ this.props.selectedNodePath }
        />
        { ruleEditor }
      </div>
    );
  }
});

module.exports = EditorContainer;
