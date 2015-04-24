var React = require('react');

var RuleActions = require('../actions/RuleActions');

var ShowRulesButton = React.createClass({
  propTypes: {
    rules: React.PropTypes.array.isRequired
  },

  _showCurrentRules: function () {

  },

  render: function () {
    return (
      <button
        type="button"
        disabled={ this.props.rules.length > 0 ? false : true }
        onClick={ this._showCurrentRules }
        className={ 'left' }
      >Show Rules</button>
    );
  }
});

module.exports = ShowRulesButton;
