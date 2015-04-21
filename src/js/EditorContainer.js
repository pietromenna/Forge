var React = require('react');

var AddRuleButton = require('./AddRuleButton');

var EditorContainer = React.createClass({
  getInitialState: function () {
    return {
      showEditor: false,
      configFields: []
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
    return (
      <div className={ 'editor-bar' }>
        <AddRuleButton
          showEditor={ this._showEditor }
          disabled={ this.props.selectedNodePath ? false : true }
        />
      </div>
    );
  }
});

module.exports = EditorContainer;
