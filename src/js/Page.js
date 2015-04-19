var React = require('react');

var Page = React.createClass({
  componentDidMount: function () {
    window.addEventListener('message', this._receiveMessageFromPage, false);
  },

  componentWillUnmount: function () {
    window.removeEventListener('message', this._receiveMessageFromPage, false);
  },

  componentWillReceiveProps: function (nextProps) {
    if (this.props.scrollPosition.x !== nextProps.scrollPosition.x || this.props.scrollPosition.y !== nextProps.scrollPosition.y) {
      this._updateScrollPosition(this.props.scrollPosition.x, this.props.scrollPosition.y);
    }
    // this._getSelectionCoordinatesFromPosition(this.props.mouseSelectionPosition.x, this.props.mouseSelectionPosition.y);
  },

  _receiveMessageFromPage: function (event) {
    switch (event.data.type) {
      case 'new-selection':
        this._newSelectionResponse(event);
        break;
      case 'window-dimensions':
        this._windowDimensionsResponse(event);
        break;
      default:
        break;
    }
  },

  _newSelectionResponse: function (event) {
    var rectCoords = event.data;

    this.props.updatePageSelection({
      top: rectCoords.top,
      bottom: rectCoords.bottom,
      left: rectCoords.left,
      right: rectCoords.right
    });
  },

  _windowDimensionsResponse: function (event) {
    var dimensions = event.data;
    this.props.updateWindowDimensions(dimensions.maxX, dimensions.maxY);
  },

  _updateScrollPosition: function (xPosition, yPosition) {
    var page = this.getDOMNode();

    page.contentWindow.postMessage({
      type: 'scroll',
      x: xPosition,
      y: yPosition
    }, 'http://localhost:3000');
  },

  _getSelectionCoordinatesFromPosition: function (xPosition, yPosition) {
    var page = this.getDOMNode();

    page.contentWindow.postMessage({
      type: 'select-coordinates',
      x: xPosition,
      y: yPosition
    }, 'http://localhost:3000')
  },

  _askForWindowDimensions: function() {
    var page = this.getDOMNode();

    page.contentWindow.postMessage({
      type: 'window-dimensions'
    }, 'http://localhost:3000');
  },

  render: function () {
    return <iframe src={ this.props.url } className="page-view" onLoad={ this._askForWindowDimensions }></iframe>
  }
});

module.exports = Page;
