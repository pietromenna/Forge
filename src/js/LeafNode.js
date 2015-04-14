var React = require('react');
var _ = require('lodash');

var LeafNode = React.createClass({
  render: function() {
    var curEl = this.props.el;
    var node;

    var attributeStr = '';
    if (curEl.attribs) {
      var attributes = [];
      _.forEach(curEl.attribs, function (value, attributeName) {
        attributes.push(attributeName + '="' + value + '"');
      });

      attributeStr = attributes.join(' ');
    }

    var startTag = '<' + curEl.name + (attributeStr.length > 0 ? (' ' + attributeStr) : '') + '>';
    var middle = unescape(_.pluck(curEl.children, 'data').join(''));
    var closeTag = '</' + curEl.name + '>';

    return <div className="node child">{ startTag + middle + closeTag }</div>;
  }
});

module.exports = LeafNode;
