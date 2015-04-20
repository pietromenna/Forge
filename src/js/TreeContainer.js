var React = require('react');
var ParentNode = require('./ParentNode');
var LeafNode = require('./LeafNode');

var TreeContainer = React.createClass({
  _selectNode: function (path) {
    this.props.selectNode(path);
  },

  render: function () {
    return (
      <div id="tree-container">
        <ParentNode
          el={ this.props.html }
          path={ 'html' }
          selectNode={ this._selectNode }
          selectedNodePath={ this.props.selectedNode }
        />
      </div>
    );
  }
});

module.exports = TreeContainer;
