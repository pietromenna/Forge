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
      currentPageScrollPosition: {
        x: 0,
        y: 0
      },
      maxPageScroll: {
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

  _updateWindowDimensions: function (maxX, maxY) {
    this.setState({
      maxPageScroll: {
        x: maxX,
        y: maxY
      }
    });
  },

  _scrollPage: function (deltaX, deltaY) {
      this.setState(function (previousState) {
        var newXPosition = previousState.currentPageScrollPosition.x - deltaX;
        var newYPosition = previousState.currentPageScrollPosition.y - deltaY;

        // Do not allow over or under scrolling
        if (newXPosition < 0) {
          newXPosition = 0;
        }

        if (newXPosition > this.state.maxPageScroll.x) {
          newXPosition = this.state.maxPageScroll.x;
        }

        if (newYPosition < 0) {
          newYPosition = 0;
        }

        if (newYPosition > this.state.maxPageScroll.y) {
          newYPosition = this.state.maxPageScroll.y;
        }

        return {
          currentPageScrollPosition: {
            x: deltaX,
            y: deltaY
          }
        }
    });
  },

  _makeSelection: function (x, y) {
    this.setState({
      selectionMousePosition: {
        x: x,
        y: y
      }
    });
  },

  render: function () {
    return (
      <div id={ 'page-container' }>
        <Page
          url={ this.props.url }
          scrollPosition={ this.state.currentPageScrollPosition }
          mouseSelectionPosition={ this.state.mouseSelectionPosition }
          updatePageSelection={ this._updatePageSelection }
          updateWindowDimensions={ this._updateWindowDimensions }
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
