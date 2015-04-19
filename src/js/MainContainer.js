var React = require('react');

var PageContainer = require('./PageContainer');
var TreeContainer = require('./TreeContainer');

var request = require('superagent');
var htmlparser = require('htmlparser2');

var MainContainer = React.createClass({
  getInitialState: function() {
    return {
      htmlTree: {},
      url: 'http://localhost:3000/test.html'
    };
  },

  componentDidMount: function() {
    request
      .get('http://localhost:3000/testhtml')
      .end(function(err, res) {
        if (err)
          return console.log(err);

        var handler = new htmlparser.DomHandler(function (error, dom) {
          if (error)
            return console.log('error: ' + error);

          this.setState({
            htmlTree: dom[1]
          });
        }.bind(this));

        var parser = new htmlparser.Parser(handler);
        parser.write(res.text);
        parser.done();
      }.bind(this));
  },

  render: function () {
    return (
      <div>
        <PageContainer url={ this.state.url }/>
        <TreeContainer html={ this.state.htmlTree }/>
      </div>
    );
  }
});

module.exports = MainContainer;
