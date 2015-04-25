var React = require('react');

var RuleActions = require('../actions/RuleActions');

var ShowRulesButton = React.createClass({
  propTypes: {
    rules: React.PropTypes.array.isRequired,
    showRules: React.PropTypes.bool.isRequired
  },

  _showCurrentRules: function () {
    this.props.toggleRules();
  },

  render: function () {
    return (
      <button
        type="button"
        disabled={ this.props.rules.length > 0 ? false : true }
        onClick={ this._showCurrentRules }
        className={ 'left' }
      >{ this.props.showRules ? 'Hide Rules' : 'Show Rules' }</button>
    );
  }
});

module.exports = ShowRulesButton;
