var React = require('react');
var _ = require('lodash');

var LeafNode = React.createClass({
  render: function() {
    var curEl = this.props.el;
    var node;

    var startTag = '<' + curEl.name + '>';
    var middle = _.pluck(curEl.children, 'data').join('');
    var closeTag = '</' + curEl.name + '>';

    return <div className="node child">{ startTag + middle + closeTag }</div>;
  }
});

module.exports = LeafNode;
