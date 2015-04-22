var React = require('react');

var AddRuleButton = require('./AddRuleButton');
var RuleEditor = require('./RuleEditor');

var EditorContainer = React.createClass({
  getInitialState: function () {
    return {
      showEditor: false
    };
  },

  _showEditor: function () {
    this.setState({
      showEditor: true
    });
  },

  _hideEditor: function () {
    this.setState({
      showEditor: false
    });
  },

  render: function () {
    var ruleEditor;

    if (this.props.draft) {
      ruleEditor = <RuleEditor selectedNodeEl={ this.props.selectedNodeEl }/>
    }

    return (
      <div className={ 'editor-bar' }>
        <AddRuleButton
          showEditor={ this._showEditor }
          disabled={ this.props.selectedNodePath ? false : true }
          createDraftRule={ this.props.createDraftRule }
        />
        { ruleEditor }
      </div>
    );
  }
});

module.exports = EditorContainer;
