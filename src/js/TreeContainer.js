var React = require('react');
var ParentNode = require('./ParentNode');
var LeafNode = require('./LeafNode');

var TreeContainer = React.createClass({
  render: function () {
    return (
      <div id="tree-container">
        <ParentNode el={ this.props.html } path={ 'html' }/>
      </div>
    );
  }
});

module.exports = TreeContainer;
