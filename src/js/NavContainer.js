var React = require('react');
var Element = require('./Element');

var NavContainer = React.createClass({
  render: function () {
    return (
      <div className="outside">
        <Element el={ this.props.doctype }/>
        <Element el={ this.props.html }/>
      </div>
    );
  }
});

module.exports = NavContainer;
