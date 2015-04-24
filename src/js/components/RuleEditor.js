var React = require('react');
var _ = require('lodash');

var DataItem = require('./DataItem');

var DraftActions = require('../actions/DraftActions');

var RuleEditor = React.createClass({
  propTypes: {
    selectedNodeEl: React.PropTypes.object.isRequired,
    draft: React.PropTypes.object.isRequired
  },

  _onNameChange: function (e) {
    var newValue = this.refs.name.getDOMNode().value;
    DraftActions.updateName(newValue);
  },

  _cancelRuleCreation: function () {
    DraftActions.destroy();
  },

  _createNewRule: function () {

  },

  render: function () {
    var attrs = _.pairs(this.props.selectedNodeEl.attribs).map(function(attr, index) {
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

    return (
      <div className="editor-container">
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
        <div className="actions">
          <button type="button" className={ 'left' } onClick={ this._cancelRuleCreation }>Cancel</button>
          <button type="button" className={ 'right' } onClick={ this._createNewRule }>Create</button>
        </div>
      </div>
    );
  }
});

module.exports = RuleEditor;
