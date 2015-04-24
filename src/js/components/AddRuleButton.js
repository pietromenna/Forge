var React = require('react');

var DraftActions = require('../actions/DraftActions');

var AddRuleButton = React.createClass({
  propTypes: {
    selectedNodePath: React.PropTypes.string,
    draft: React.PropTypes.object
  },

  _createDraftRule: function () {
    DraftActions.create(this.props.selectedNodePath);
  },

  render: function () {
    return (
      <button
        type="button"
        disabled={ (this.props.selectedNodePath && !this.props.draft) ? false : true }
        onClick={ this._createDraftRule }
        className={ 'add-rule' }
      >Add Rule</button>
    );
  }
});

module.exports = AddRuleButton;
