(function() {
  var $, _;

  _ = require('lodash');

  $ = require('fire-keeper');

  // return
  module.exports = async function() {
    var cont, i, j, k, l, len, len1, len2, line, listCont, listResult, listSource, ref, source;
    $.info("check 'class'");
    $.info().pause();
    listSource = (await $.source_('./source/component/**/index.styl'));
    listCont = (await (async function() {
      var j, len, results;
      results = [];
      for (j = 0, len = listSource.length; j < len; j++) {
        source = listSource[j];
        results.push((await $.read_(source)));
      }
      return results;
    })());
    $.info().resume();
    listResult = [];
    for (i = j = 0, len = listSource.length; j < len; i = ++j) {
      source = listSource[i];
      cont = listCont[i];
      ref = cont.split('\n');
      for (i = k = 0, len1 = ref.length; k < len1; i = ++k) {
        line = ref[i];
        if (line[0] !== '.') {
          continue;
        }
        listResult.push(`'${source}' line ${i}: ${line}`);
      }
    }
    if (!listResult.length) {
      return this;
    }
    listResult = _.uniq(listResult);
    for (l = 0, len2 = listResult.length; l < len2; l++) {
      line = listResult[l];
      $.info(line);
    }
    return this;
  };

}).call(this);
