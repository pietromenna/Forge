var React = require('react');
var _ = require('lodash');

var scrollToNode = function (path, selectedNodePath) {
  if (selectedNodePath && selectedNodePath === path) {
    var url = window.location.href;
    window.location.href = url + '#' + path;
    history.replaceState(null,null,url);
  }
};

var LeafNode = React.createClass({
  componentWillMount: function () {
    if (this.props.selectedNodePath && this.props.selectedNodePath === this.props.path) {
      this.props.setSelectedNodeEl(this.props.el);
    }
  },

  componentDidMount: function () {
    scrollToNode(this.props.path, this.props.selectedNodePath);
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.selectedNodePath && nextProps.selectedNodePath !== this.props.selectedNodePath && nextProps.selectedNodePath === nextProps.path) {
      nextProps.setSelectedNodeEl(nextProps.el);
    }
  },

  componentDidUpdate: function () {
    scrollToNode(this.props.path, this.props.selectedNodePath);
  },

  _highlightElementClickHandler: function () {
    this.props.selectNode(this.props.path);
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

    var classes = ['node', 'child'];

    if (this.props.path === this.props.selectedNodePath) {
      classes.push('selected');
    }

    return (
      <div className={ classes.join(' ') } onClick={ this._highlightElementClickHandler } id={ this.props.path }>
        <span className="tag">{ startTag }</span>
        <span>{ middle }</span>
        <span className="tag">{ closeTag }</span>
      </div>
    );
  }
});

module.exports = LeafNode;
