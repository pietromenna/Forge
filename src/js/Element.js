var React = require('react');

var Element = React.createClass({
  getInitialState: function () {
    return {
      showChildren: false
    };
  },
  _showChildrenClickHandler: function () {
    this.setState(function (previousState) {
      return {
        showChildren: !previousState.showChildren
      };
    });
  },
  render: function () {
    var curEl = this.props.el;

    var startTag = '<' + curEl.name + '>';
    var middle = '...';
    var closeTag = '</' + curEl.name + '>';

    if (curEl.children && curEl.children.length > 0) {
      var childEls = [];

      if (this.state.showChildren) {
        curEl.children.forEach(function(el, index) {
          if (el.type === 'tag')
            childEls.push(<Element el={ el } key={ index }/>);
        });
      }

      var fontAwesomeIconTypes = ['fa', 'fa-lg'];

      if (this.state.showChildren)
        fontAwesomeIconTypes.push('fa-caret-down');
      else
        fontAwesomeIconTypes.push('fa-caret-right');

      return (
        <div className="element">
          <i className={ fontAwesomeIconTypes.join(' ') } onClick={ this._showChildrenClickHandler }></i>
          { startTag }
          { this.state.showChildren ? childEls : middle }
          { closeTag }
        </div>
      );
    }
    else {
      return (
        <div className="element">
          { startTag }{ closeTag }
        </div>
      );
    }
  }
});

module.exports = Element;
