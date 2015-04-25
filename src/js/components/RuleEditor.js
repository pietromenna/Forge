var React = require('react');
var _ = require('lodash');

var DataItem = require('./DataItem');

var DraftActions = require('../actions/DraftActions');
var RuleActions = require('../actions/RuleActions');

var RuleEditor = React.createClass({
  propTypes: {
    selectedNodeEl: React.PropTypes.object.isRequired,
    draft: React.PropTypes.object.isRequired,
    rules: React.PropTypes.array.isRequired
  },

  _onNameChange: function (e) {
    var newValue = this.refs.name.getDOMNode().value;
    DraftActions.updateName(newValue);
  },

  _cancelRuleCreation: function () {
    DraftActions.destroy();
  },

  _createNewRule: function () {
    RuleActions.create(this.props.draft);
    DraftActions.destroy();
  },

  render: function () {
    var text = '';
    this.props.selectedNodeEl.children.forEach(function (child) {
      if (child.type === 'text') {
        text += child.data;
      }
    });

    var attributesAsKeyValuePairs = _.pairs(this.props.selectedNodeEl.attribs);
    attributesAsKeyValuePairs.push(['text', text]);

    var attrs = attributesAsKeyValuePairs.map(function(attr, index) {
      var attribute = attr[0];
      var value = attr[1];

      return (
        <DataItem
          attribute={ attribute }
          value={ value }
          selected={ this.props.draft.data[attribute] ? true : false }
          key={ index }
        />
      );
    }.bind(this));

    var subRules = [];

    this.props.rules.forEach(function (rule) {
      if (rule.target.indexOf(this.props.draft.target) === 0) {
        subRules.push(rule);
      }
    }.bind(this));

    var subRuleList;

    if (subRules.length > 0) {
      subRules = subRules.map(function (rule, index) {
        return (
          <option key={ index }>{ rule.name }</option>
        );
      });

      subRuleList = (
        <select>
          { subRules }
        </select>
      );
    }

    return (
      <div className="editor-container dialog-container">
        <div className="details">
          <div className="header">Details</div>
          <div className="content">
            <div className="field">
              <label>Name</label>
              <input type="text" onChange={ this._onNameChange } ref={ 'name' } value={ this.props.draft.name }/>
            </div>
          </div>
        </div>
        <div className="data">
          <div className="header">Data</div>
          <div className="content">
            { attrs }
          </div>
        </div>
        <div className="sub-rules">
          <div className="header">Sub Rules</div>
          { subRuleList }
        </div>
        <div className="actions">
          <button type="button" className={ 'left' } onClick={ this._cancelRuleCreation }>Cancel</button>
          <button type="button" className={ 'right' } onClick={ this._createNewRule }>Create</button>
        </div>
      </div>
    );
  }
});

module.exports = RuleEditor;
