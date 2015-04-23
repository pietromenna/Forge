var React = require('react');

var DraftActions = require('../actions/DraftActions');

var AddRuleButton = React.createClass({
  propTypes: {
    selectedNodePath: React.PropTypes.string
  },

  _createDraftRule: function () {
    DraftActions.create(this.props.selectedNodePath);
  },

  render: function () {
    return (
      <button
        type="button"
        disabled={ this.props.selectedNodePath ? false : true }
        onClick={ this._createDraftRule }
        className={ 'add-rule' }
      >
      Add Rule
      </button>
    );
  }
});

module.exports = AddRuleButton;
