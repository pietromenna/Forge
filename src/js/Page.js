var React = require('react');

var Page = React.createClass({
  componentDidMount: function () {
    window.addEventListener('message', this._newSelectionResponse, false);
  },

  componentWillUnmount: function () {
    window.removeEventListener('message', this._newSelectionResponse, false);
  },

  componentWillReceiveProps: function (nextProps) {
    this._updateScrollPosition(this.props.scrollDeltas.x, this.props.scrollDeltas.y);
    // this._getSelectionCoordinatesFromPosition(this.props.mouseSelectionPosition.x, this.props.mouseSelectionPosition.y);
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

  render: function () {
    return <iframe src={ this.props.url } className="page-view"></iframe>
  }
});

module.exports = Page;
