var React = require('react');

var request = require('superagent');
var htmlparser = require('htmlparser2');
var treeToHtml = require('htmlparser-to-html');
var _ = require('lodash');

var PageContainer = require('./PageContainer');
var EditorContainer = require('./EditorContainer');
var TreeContainer = require('./TreeContainer');

var DraftStore = require('../stores/DraftStore');
var RuleStore = require('../stores/RuleStore');

var getDraftState = function() {
  var state = DraftStore.getDraft();

  if (_.isEmpty(state)) {
    return null;
  }
  else {
    return state;
  }
};

var getRuleState = function() {
  return RuleStore.getAllRules();
}

var MainContainer = React.createClass({
  getInitialState: function () {
    return {
      html: '',
      htmlTree: {},
      url: 'http://localhost:3000/current.html',
      selectedNodePath: null,
      selectedNodeEl: null,
      rules: getRuleState(),
      draft: getDraftState()
    };
  },

  componentDidMount: function () {
    request
      .get('http://localhost:3000/get-page?url=http://www.landsend.com/products/toddler-snow-flurry-boots/id_261708')
      .end(function(err, res) {
        if (err)
          return console.log(err);

        var html = res.text;

        var handler = new htmlparser.DomHandler(function (error, dom) {
          if (error)
            return console.log('error: ' + error);

          dom[0].children.forEach(function (el, index) {
            if (el.name === 'head') {
              var tmp = el.children

              if (el.children === null) {
                tmp = [];
              }

              var jqueryScript = {
                attribs: {
                  type: 'text/javascript',
                  src: '/jquery.min.js'
                },
                children: [],
                name: 'script',
                next: null,
                prev: null,
                parent: el,
                type: 'script'
              };

              var jqueryXpathScript = {
                attribs: {
                  type: 'text/javascript',
                  src: '/jquery.xpath.min.js'
                },
                children: [],
                name: 'script',
                next: null,
                prev: jqueryScript,
                parent: el,
                type: 'script'
              };

              jqueryScript.next = jqueryXpathScript;

              var newScriptEl = {
                attribs: {
                  type: 'text/javascript'
                },
                children: [],
                name: 'script',
                next: el.children[0],
                prev: jqueryXpathScript,
                parent: el,
                type: 'script'
              };

              jqueryXpathScript.next = newScriptEl;

              var newTextEl = {
                data: "\
                  var getXpathForEl = function(el) { \
          				var path = ''; \
          				var curEl = el; \
           				while (curEl != document.children[0]) { \
          				    var curTag = curEl.nodeName.toLowerCase(); \
          				    var curTagCount = 0; \
          				    var siblings = curEl.parentNode.children; \
          				    for (var i = 0; i < siblings.length; i++) { \
          				        var el = siblings[i]; \
          				        if (el.nodeName.toLowerCase() === curTag && el !== curEl) { \
          				            curTagCount++; \
          				        } \
          				        if (el === curEl) { \
          				            curTagCount++; \
          				            break; \
          				        } \
          				    } \
          				    path = '/' + curEl.nodeName.toLowerCase() + '[' + curTagCount + ']' + path; \
          				    curEl = curEl.parentNode \
          				} \
          				path = 'html' + path; \
          				return path; \
          			}; \
          			window.addEventListener('message', function (e) { \
          				if (e.data.type === 'scroll') { \
          					var top  = window.pageYOffset || document.documentElement.scrollTop; \
              			var left = window.pageXOffset || document.documentElement.scrollLeft; \
          					window.scrollTo(left - e.data.x, top - e.data.y); \
          				} \
          				else if (e.data.type === 'get-xpath') { \
          					var el = document.elementFromPoint(e.data.x, e.data.y); \
          					if (el !== null) { \
          						var xpath = getXpathForEl(el); \
          						parent.postMessage({ \
          							type: 'path', \
          							path: xpath \
          						}, 'http://localhost:3000'); \
          					} \
          				} \
          				else { \
          					var el = getElByXpath(e.data.path); \
                    console.log(el); \
          					if (el !== null) { \
          						var rect = el.getBoundingClientRect(); \
          						parent.postMessage({ \
          							type: 'coordinates', \
          							bottom: rect.bottom, \
          							height: rect.height, \
          							left: rect.left, \
          							right: rect.right, \
          							top: rect.top, \
          							width: rect.width \
          						}, 'http://localhost:3000'); \
          					} \
          				} \
          			}, false); \
                var getElByXpath = function (path) { \
                  console.log('path getting made', path); \
                  var parts = path.split('/'); \
                  var curNode = document.children[0]; \
                  if (parts[0] === curNode.tagName.toLowerCase()) { \
                      parts.shift(); \
                      for (var m = 0; m < parts.length; m++) { \
                          var part = parts[m]; \
                          var partSplit = part.split('['); \
                          var tagLookingFor = partSplit[0]; \
                          var tagLookingForCount = parseInt(partSplit[1].split(']')[0]); \
                          var curNodeChildren = curNode.children; \
                          var nodeTypeCount = {}; \
                          var divs = []; \
                          if (curNodeChildren.length > 0) { \
                              var prevNode = curNode; \
                              for (var i = 0; i < curNodeChildren.length; i++) { \
                                 var child = curNodeChildren[i]; \
                                 var tagName = child.tagName.toLowerCase(); \
                                 if (tagName === 'div') { \
                                   divs.push(child); \
                                 } \
                                 nodeTypeCount[tagName] = nodeTypeCount[tagName] ? nodeTypeCount[tagName] + 1 : 1; \
                                 if (tagName === tagLookingFor && nodeTypeCount[tagName] === tagLookingForCount) { \
                                      curNode = child; \
                                      break; \
                                 } \
                              } \
                              if (prevNode === curNode) { \
                                  console.log('no match at: ', curNode); \
                                  break; \
                              } \
                          } \
                      } \
                  } \
                return curNode; \
              };",
                parent: newScriptEl,
                type: 'text'
              };

              newScriptEl.children.push(newTextEl);

              tmp.unshift(newScriptEl);
              tmp.unshift(jqueryXpathScript);
              tmp.unshift(jqueryScript);

              if (tmp.length >= 4) {
                tmp[3].prev = newScriptEl;
              }

              dom[0].children[index].children = tmp;
            }
          });

          var newHtml = treeToHtml(dom[0]);

          this.setState({
            htmlTree: dom[0],
            html: newHtml
          });
        }.bind(this));

        var parser = new htmlparser.Parser(handler);
        parser.write(html);
        parser.done();
      }.bind(this));

    DraftStore.addChangeListener(this._onDraftChange);
    RuleStore.addChangeListener(this._onRuleChange);
  },

  componentWillUnMount: function () {
    DraftStore.removeChangeListener(this._onDraftChange);
    RuleStore.removeChangeListener(this._onRuleChange);
  },

  _onDraftChange: function() {
    this.setState({
      draft: getDraftState()
    });
  },

  _onRuleChange: function() {
    this.setState({
      rules: getRuleState()
    });
  },

  _selectNode: function (path) {
    if (this.state.draft === null) {
      this.setState({
        selectedNodePath: path
      });
    }
  },

  _setSelectedNodeEl: function (el) {
    if (this.state.draft === null) {
      this.setState({
        selectedNodeEl: el
      });
    }
  },

  render: function () {
    return (
      <div>
        <PageContainer
          url={ this.state.url }
          html={ this.state.html }
          selectedNode={ this.state.selectedNodePath }
          selectNode={ this._selectNode }
        />
        <div className={ 'main-page-container' }>
          <EditorContainer
            selectedNodePath={ this.state.selectedNodePath }
            selectedNodeEl={ this.state.selectedNodeEl }
            draft={ this.state.draft }
            rules={ this.state.rules }
          />
          <TreeContainer
            html={ this.state.htmlTree }
            selectedNode={ this.state.selectedNodePath }
            selectNode={ this._selectNode }
            setSelectedNodeEl={ this._setSelectedNodeEl }
          />
        </div>
      </div>
    );
  }
});

module.exports = MainContainer;
