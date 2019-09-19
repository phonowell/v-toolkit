(function() {
  var $;

  $ = require('fire-keeper');

  // return
  module.exports = async function(cont) {
    var _cont, dirname, i, len, listSource, name, source;
    if (!cont) {
      return cont;
    }
    listSource = (await $.source_(['./source/component/**/*.pug', '!**/index.pug']));
    listSource.sort();
    _cont = [];
    for (i = 0, len = listSource.length; i < len; i++) {
      source = listSource[i];
      name = $.getBasename(source);
      dirname = $.getBasename($.getDirname(source));
      _cont = [..._cont, `- ${dirname}/${name}: [.pug](../source/component/${dirname}/${name}.pug) / [.styl](../source/component/${dirname}/${name}.styl) / [.coffee](../source/component/${dirname}/${name}.coffee)`];
    }
    // return
    return [...cont, '## 组件', '', `共计${listSource.length}个组件。`, '', ..._cont, ''];
  };

}).call(this);
