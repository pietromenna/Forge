var React = require('react');

var PageSelector = React.createClass({
  _scrollPage: function(event) {
    // hide the selection when the page is scrolled
    this.props.scrollPage(event.deltaX, event.deltaY);
    this.props.hideSelection();
  },

  _makeSelection: function(event) {
    this.props.makeSelection(event.clientX, event.clientY);
  },

  render: function () {
    if (this.props.displaySelection) {
      var dimensions = this.props.selectionDimensions;
      var dimensionsStyles = {
        top: dimensions.top + 'px',
        right: dimensions.right + 'px',
        bottom: dimensions.bottom + 'px',
        left: dimensions.left + 'px',
        width: dimensions.width + 'px',
        height: dimensions.height + 'px'
      };

      return (
        <div id="overlay" onWheel={ this._scrollPage } onClick={ this._makeSelection }>
          <div id="overlay-inside">
            <div id="highlight" style={ this.props.selectionDimensions }></div>
          </div>
        </div>
      );
    }
    else {
      return (
        <div id="overlay" onWheel={ this._scrollPage } onClick={ this._makeSelection }>
          <div id="overlay-inside">
          </div>
        </div>
      );
    }
  }
});

module.exports = PageSelector;
