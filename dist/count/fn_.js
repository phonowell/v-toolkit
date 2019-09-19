(function() {
  var $;

  $ = require('fire-keeper');

  // return
  module.exports = async function(cont) {
    var _cont, i, len, listSource, name, source;
    if (!cont) {
      return cont;
    }
    listSource = (await $.source_('./source/function/*.coffee'));
    listSource.sort();
    _cont = [];
    for (i = 0, len = listSource.length; i < len; i++) {
      source = listSource[i];
      name = $.getBasename(source);
      _cont = [..._cont, `- [$.${name}()](../source/function/${name}.coffee)`];
    }
    // return
    return [...cont, '## 函数', '', `共计${listSource.length}个函数。`, '', ..._cont, ''];
  };

}).call(this);
