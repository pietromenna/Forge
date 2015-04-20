var React = require('react');

var Page = require('./Page');
var PageSelector = require('./PageSelector');

var _ = require('lodash');

var PageContainer = React.createClass({
  getInitialState: function () {
    return {
      mouseSelectionPosition: {
        x: 0,
        y: 0
      },
      selectionDimensions: {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      },
      displaySelection: false,
      currentPageScrollDelta: {
        x: 0,
        y: 0
      }
    };
  },

  _hideSelection: function () {
    this.setState({
      displaySelection: false
    });
  },

  _updatePageSelection: function (dimensions) {
    this.setState({
      selectionDimensions: _.clone(dimensions),
      displaySelection: true
    });
  },

  _scrollPage: function (deltaX, deltaY) {
      this.setState(function (previousState) {
        return {
          currentPageScrollDelta: {
            x: deltaX,
            y: deltaY
          }
        };
    });
  },

  _makeSelection: function (x, y) {
    this.setState({
      mouseSelectionPosition: {
        x: x,
        y: y
      }
    });
  },

  _selectNode: function(path) {
    this.props.selectNode(path);
  },

  render: function () {
    return (
      <div id={ 'page-container' }>
        <Page
          url={ this.props.url }
          scrollDeltas={ this.state.currentPageScrollDelta }
          selectedNodePath={ this.props.selectedNode }
          hideSelection={ this._hideSelection }
          mouseSelectionPosition={ this.state.mouseSelectionPosition }
          updatePageSelection={ this._updatePageSelection }
          selectNode={ this._selectNode }
        />
        <PageSelector
          selectionDimensions={ this.state.selectionDimensions }
          displaySelection={ this.state.displaySelection }
          scrollPage={ this._scrollPage }
          hideSelection={ this._hideSelection }
          makeSelection={ this._makeSelection }
        />
      </div>
    );
  }
});

module.exports = PageContainer;
