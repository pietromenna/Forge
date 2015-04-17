var React = require('react');
var _ = require('lodash');

var LeafNode = React.createClass({
  _highlightElementClickHandler: function () {
    var curPath = this.props.path;

    var page = document.getElementById('current-page');

    page.contentWindow.postMessage({
      type: 'select-from-tree',
      xpath: curPath
    }, 'http://localhost:3000');
  },

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

    return (
      <div className="node child" onClick={ this._highlightElementClickHandler }>
        <span className="tag">{ startTag }</span>
        <span>{ middle }</span>
        <span className="tag">{ closeTag }</span>
      </div>
    );
  }
});

module.exports = LeafNode;
