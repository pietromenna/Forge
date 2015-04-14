var React = require('react');
var _ = require('lodash');

var LeafNode = require('./LeafNode');

var ParentNode = React.createClass({
  getInitialState: function () {
    return {
      showChildren: false
    };
  },

  _showChildrenClickHandler: function () {
    this.setState(function (previousState) {
      return {
        showChildren: !previousState.showChildren
      };
    });
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

    var childNodes = [];

    curEl.children.forEach(function(el, index) {
      if (el.type === 'tag') {
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

        if (nodeHasTagChildren)
          childNodes.push(<ParentNode el={ el } key={ index }/>);
        else
          childNodes.push(<LeafNode el={ el } key={ index }/>);
      }
    });

    return childNodes;
  },

  render: function() {
    var curEl = this.props.el;
    var node;

    var startTag = '<' + curEl.name + '>';
    var middle = '...';
    var closeTag = '</' + curEl.name + '>';

    if (this.state.showChildren) {
      node = (
        <div className="node parent">
          { this._createExpandChildrenElement() }
          <span>{ startTag }
          { this._createChildNodes() }
          { closeTag }</span>
        </div>
      );
    }
    else {
      node = (
        <div className="node parent">
          { this._createExpandChildrenElement() }
          <span>{ startTag + middle + closeTag }</span>
        </div>
      );
    }

    return node;
  }
});

module.exports = ParentNode;
