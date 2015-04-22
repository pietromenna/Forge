var React = require('react');

var RuleEditor = React.createClass({
  render: function () {
    console.log(this.props.selectedNodeEl);
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
            <div className="field">
              <input type="checkbox">href <span className="details">(#site-search-input)</span></input>
            </div>
            <div className="field">
              <input type="checkbox">class</input>
            </div>
            <div className="field">
            <input type="checkbox">title <span className="details">(skip to search)</span></input>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = RuleEditor;
