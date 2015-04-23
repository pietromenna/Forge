var React = require('react');

var DraftActions = require('../actions/DraftActions');

var DataItem = React.createClass({
  propTypes: {
    selected: React.PropTypes.bool.isRequired,
    attribute: React.PropTypes.string.isRequired,
    value: React.PropTypes.string.isRequired
  },

  _dataSelect: function (event) {
    if (this.props.selected) {
      DraftActions.removeData(this.props.attribute);
    }
    else {
      DraftActions.addData(this.props.attribute, this.props.value);
    }
  },

  render: function () {
    return (
      <div className="field">
        <input type="checkbox" onChange={ this._dataSelect } checked={ this.props.selected }>{ this.props.attribute } <span className="details">({ this.props.value })</span></input>
      </div>
    );
  }
});

module.exports = DataItem;
