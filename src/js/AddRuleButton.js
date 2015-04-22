var React = require('react');

var AddRuleButton = React.createClass({
  _createDraftRule: function () {
    this.props.createDraftRule();
  },

  render: function () {
    if (this.props.disabled) {
      return <button type="button" disabled className={ 'add-rule' }>Add Rule</button>
    }
    else {
      return <button type="button" className={ 'add-rule' } onClick={ this._createDraftRule }>Add Rule</button>
    }
  }
});

module.exports = AddRuleButton;
