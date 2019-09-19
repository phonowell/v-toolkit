(function() {
  var $;

  $ = require('fire-keeper');

  // return
  module.exports = async function(cont) {
    var _cont, i, len, listSource, name, source;
    if (!cont) {
      return cont;
    }
    listSource = (await $.source_('./source/component/**/index.pug'));
    listSource.sort();
    _cont = [];
    for (i = 0, len = listSource.length; i < len; i++) {
      source = listSource[i];
      name = $.getBasename($.getDirname(source));
      _cont = [..._cont, `- ${name}: [.pug](../source/component/${name}/index.pug) / [.styl](../source/component/${name}/index.styl) / [.coffee](../source/component/${name}/index.coffee)`];
    }
    // return
    return [...cont, '## 页面', '', `共计${listSource.length}个页面。`, '', ..._cont, ''];
  };

}).call(this);
