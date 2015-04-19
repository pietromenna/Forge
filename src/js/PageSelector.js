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
    return (
      <div id="overlay" onWheel={ this._scrollPage } onClick={ this._makeSelection }>
        <div id="overlay-inside">
          <div id="highlight" style={ this.props.dimensions }></div>
        </div>
      </div>
    );
  }
});

module.exports = PageSelector;
