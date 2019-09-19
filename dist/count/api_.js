(function() {
  var $;

  $ = require('fire-keeper');

  // return
  module.exports = async function(cont) {
    var _cont, basename, count, i, key, len, list, listSource, source, value;
    if (!cont) {
      return cont;
    }
    listSource = (await $.source_('./data/api/**/*.yaml'));
    listSource.sort();
    _cont = [];
    count = 0;
    for (i = 0, len = listSource.length; i < len; i++) {
      source = listSource[i];
      basename = $.getBasename(source);
      list = (await $.read_(source));
      for (key in list) {
        value = list[key];
        _cont = [..._cont, `- ${basename}/${key}: ${value.url} [document](${value.doc}) / [mock](${value.mock})`];
        count++;
      }
    }
    // return
    return [...cont, '## 接口', '', `共计${count}个接口。`, '', ..._cont, ''];
  };

}).call(this);
