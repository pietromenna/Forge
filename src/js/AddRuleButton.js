var React = require('react');

var AddRuleButton = React.createClass({
  render: function () {
    if (this.props.disabled) {
      return <button type="button" disabled className={ 'add-rule' }>Add Rule</button>
    }
    else {
      return <button type="button" className={ 'add-rule' }>Add Rule</button>
    }
  }
});

module.exports = AddRuleButton;
