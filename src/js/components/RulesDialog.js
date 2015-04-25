var React = require('react');
var _ = require('lodash');

var RulesDialog = React.createClass({
  propTypes: {
    rules: React.PropTypes.array
  },

  render: function () {
    var rules = this.props.rules.map(function (rule, index) {
      return (
        <div className="rule-container" key={ index }>
          <div>{ rule.name }</div>
          <div>data: { _.keys(rule.data).join(', ') }</div>
        </div>
      );
    });

    return (
      <div className="rules-dialog-container dialog-container">
        { rules }
      </div>
    );
  }
});

module.exports = RulesDialog;
