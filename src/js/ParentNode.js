var React = require('react');
var _ = require('lodash');

var LeafNode = require('./LeafNode');

var scrollToNode = function (path, selectedNodePath) {
  if (selectedNodePath && selectedNodePath === path) {
    var url = window.location.href;
    window.location.href = url + '#' + path;
    history.replaceState(null,null,url);
  }
};

var ParentNode = React.createClass({
  getInitialState: function () {
    return {
      showChildren: false
    };
  },

  componentWillMount: function () {
    if (this.props.selectedNodePath && this.props.selectedNodePath.indexOf(this.props.path) !== -1) {
      this.setState({
        showChildren: true
      });

      if (this.props.selectedNodePath === this.props.path) {
        this.props.setSelectedNodeEl(this.props.el);
      }
    }
  },

  componentDidMount: function () {
    scrollToNode(this.props.path, this.props.selectedNodePath);
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.selectedNodePath && nextProps.selectedNodePath !== this.props.selectedNodePath && nextProps.selectedNodePath.indexOf(nextProps.path) !== -1) {
      this.setState({
        showChildren: true
      });

      if (nextProps.selectedNodePath === nextProps.path) {
        nextProps.setSelectedNodeEl(nextProps.el);
      }
    }
  },

  componentDidUpdate: function () {
    scrollToNode(this.props.path, this.props.selectedNodePath);
  },

  _showChildrenClickHandler: function () {
    this.props.selectNode(this.props.path);
    this.setState(function (previousState) {
      return {
        showChildren: !previousState.showChildren
      };
    });
  },

  _highlightElementClickHandler: function () {
    this.props.selectNode(this.props.path);
  },

  _createExpandChildrenElement: function() {
    var fontAwesomeIconTypes = ['fa', 'fa-lg'];

    if (this.state.showChildren) {
      fontAwesomeIconTypes.push('fa-caret-down');
    }
    else {
      fontAwesomeIconTypes.push('fa-caret-right');
    }

    return <i className={ fontAwesomeIconTypes.join(' ') } onClick={ this._showChildrenClickHandler }></i>;
  },

  _createChildNodes: function() {
    var curEl = this.props.el;
    var curElPath = this.props.path;

    var childNodes = [];

    var tagCounts = {};

    curEl.children.forEach(function(el, index) {
      if (el.type === 'tag') {
        if (tagCounts[el.name])
          tagCounts[el.name]++;
        else
          tagCounts[el.name] = 1;

        var nodeHasTagChildren = false;
        if (el.children && el.children.length > 0) {
          var childTypes = _.pluck(el.children, 'type')

          if (childTypes.indexOf('tag') === -1) {
            nodeHasTagChildren = false;
          }
          else {
            nodeHasTagChildren = true;
          }
        }

        var path = curElPath + '/' + el.name + '[' + tagCounts[el.name] + ']';

        if (nodeHasTagChildren) {
          childNodes.push(
            <ParentNode
              el={ el }
              path={ path }
              selectNode={ this.props.selectNode }
              selectedNodePath={ this.props.selectedNodePath }
              setSelectedNodeEl={ this.props.setSelectedNodeEl }
              key={ index }
            />
          );
        }
        else {
          childNodes.push(
            <LeafNode
              el={ el }
              path={ path }
              selectNode={ this.props.selectNode }
              selectedNodePath={ this.props.selectedNodePath }
              setSelectedNodeEl={ this.props.setSelectedNodeEl }
              key={ index }
            />
          );
        }
      }
    }.bind(this));

    return childNodes;
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
    var middle = '...';
    var closeTag = '</' + curEl.name + '>';

    var classes = ['node', 'parent'];

    if (this.props.path === this.props.selectedNodePath) {
      classes.push('selected');
    }

    if (this.state.showChildren) {
      node = (
        <div className={ classes.join(' ') } id={ this.props.path }>
          { this._createExpandChildrenElement() }
          <span className="tag" onClick={ this._highlightElementClickHandler }>{ startTag }</span>
          { this._createChildNodes() }
          <span className="tag">{ closeTag }</span>
        </div>
      );
    }
    else {
      node = (
        <div className={ classes.join(' ') } id={ this.props.path }>
          { this._createExpandChildrenElement() }
          <span className="tag" onClick={ this._highlightElementClickHandler }>{ startTag }</span>
          <span>{ middle }</span>
          <span className="tag">{ closeTag }</span>
        </div>
      );
    }

    return node;
  }
});

module.exports = ParentNode;
