var React = require('react');
var _ = require('lodash');

var RuleEditor = React.createClass({
  render: function () {
    var attrs = _.pairs(this.props.selectedNodeEl.attribs).map(function(attr, index) {
      return (
        <div className="field" key={ index }>
          <input type="checkbox">{ attr[0] } <span className="details">({ attr[1] })</span></input>
        </div>
      );
    });
    return (
      <div className="editor-container">
        <div className="details">
          <div className="header">Details</div>
          <div className="content">
            <div className="field">
              <label>Name</label>
              <input type="text"/>
            </div>
          </div>
        </div>
        <div className="data">
          <div className="header">Data</div>
          <div className="content">
            { attrs }
          </div>
        </div>
      </div>
    );
  }
});

module.exports = RuleEditor;
