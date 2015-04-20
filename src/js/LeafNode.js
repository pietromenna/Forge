var React = require('react');
var _ = require('lodash');

var LeafNode = React.createClass({
  _highlightElementClickHandler: function () {
    this.props.selectNode(this.props.path);
  },

  componentDidMount: function () {
    if (this.props.selectedNodePath && this.props.selectedNodePath === this.props.path) {
      var url = window.location.href;
      window.location.href = url + '#' + this.props.path;
      history.replaceState(null,null,url);
    }
  },

  componentDidUpdate: function () {
    if (this.props.selectedNodePath && this.props.selectedNodePath === this.props.path) {
      var url = window.location.href;
      window.location.href = url + '#' + this.props.path;
      history.replaceState(null,null,url);
    }
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
      <div className="node child" onClick={ this._highlightElementClickHandler } id={ this.props.path }>
        <span className="tag">{ startTag }</span>
        <span>{ middle }</span>
        <span className="tag">{ closeTag }</span>
      </div>
    );
  }
});

module.exports = LeafNode;
