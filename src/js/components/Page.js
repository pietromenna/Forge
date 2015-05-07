var React = require('react');

var Page = React.createClass({
  _insertHTML: function (html) {
    var iframeDocument = this.getDOMNode().contentWindow.document;
    iframeDocument.open();
    iframeDocument.write(html);
    iframeDocument.close();
  },

  componentDidMount: function () {
    window.addEventListener('message', this._newSelectionResponse, false);
  },

  componentWillUnmount: function () {
    window.removeEventListener('message', this._newSelectionResponse, false);
  },

  componentWillReceiveProps: function (nextProps) {
    // TODO: change deltas so that don't accidently ignore similar scrolls in a row
    // don't update the scroll position with the current deltas unless the deltas are new
    if (this.props.scrollDeltas !== nextProps.scrollDeltas) {
      this._updateScrollPosition(nextProps.scrollDeltas.x, nextProps.scrollDeltas.y);
    }

    if (this.props.mouseSelectionPosition !== nextProps.mouseSelectionPosition) {
      this._getNodePathFromPosition(nextProps.mouseSelectionPosition.x, nextProps.mouseSelectionPosition.y);
    }

    if (this.props.selectedNodePath !== nextProps.selectedNodePath) {
      if (nextProps.selectedNodePath === undefined) {
        this.props.hideSelection();
      }
      else {
        this._getNodeDimensionsFromPath(nextProps.selectedNodePath);
      }
    }
  },

  componentWillUpdate: function (nextProps, nextState) {
    if (this.props.html !== nextProps.html) {
      this._insertHTML(nextProps.html);
    }
  },

  _newSelectionResponse: function (event) {
    if (event.data.type === 'path') {
      this.props.selectNode(event.data.path);
    }
    else if (event.data.type === 'coordinates') {
      var rectCoords = event.data;

      this.props.updatePageSelection({
        top: rectCoords.top,
        bottom: rectCoords.bottom,
        left: rectCoords.left,
        right: rectCoords.right,
        width: rectCoords.width,
        height: rectCoords.height
      });
    }
  },

  _updateScrollPosition: function (xPosition, yPosition) {
    var page = this.getDOMNode();

    page.contentWindow.postMessage({
      type: 'scroll',
      x: xPosition,
      y: yPosition
    }, 'http://localhost:3000');
  },

  _getNodePathFromPosition: function (xPosition, yPosition) {
    var page = this.getDOMNode();

    page.contentWindow.postMessage({
      type: 'get-xpath',
      x: xPosition,
      y: yPosition
    }, 'http://localhost:3000');
  },

  _getNodeDimensionsFromPath: function (path) {
    var page = this.getDOMNode();

    page.contentWindow.postMessage({
      type: 'get-dimensions',
      path: path
    }, 'http://localhost:3000');
  },

  render: function () {
    return <iframe className="page-view"></iframe>
  }
});

module.exports = Page;
