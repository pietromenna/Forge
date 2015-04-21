var React = require('react');

var PageContainer = require('./PageContainer');
var EditorContainer = require('./EditorContainer');
var TreeContainer = require('./TreeContainer');

var request = require('superagent');
var htmlparser = require('htmlparser2');

var MainContainer = React.createClass({
  getInitialState: function() {
    return {
      htmlTree: {},
      url: 'http://localhost:3000/test.html',
      selectedNodePath: null
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

  _selectNode: function (path) {
    this.setState({
      selectedNodePath: path
    });
  },

  render: function () {
    return (
      <div>
        <PageContainer
          url={ this.state.url }
          selectedNode={ this.state.selectedNodePath }
          selectNode={ this._selectNode }
        />
        <div className={ 'main-page-container' }>
          <EditorContainer
            selectedNodePath={ this.state.selectedNodePath }
          />
          <TreeContainer
            html={ this.state.htmlTree }
            selectedNode={ this.state.selectedNodePath }
            selectNode={ this._selectNode }
          />
        </div>
      </div>
    );
  }
});

module.exports = MainContainer;
