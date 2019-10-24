(function() {
  var $, _;

  _ = require('lodash');

  $ = require('fire-keeper');

  // return
  module.exports = async function() {
    var cont, fn, i, isUsed, j, k, len, len1, len2, line, listCont, listFn, listResult, listSource, source;
    $.info("check 'fn'");
    $.info().pause();
    listFn = (await $.source_('./source/function/*.coffee'));
    listFn = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = listFn.length; i < len; i++) {
        source = listFn[i];
        results.push($.getBasename(source));
      }
      return results;
    })();
    listSource = (await $.source_('./source/**/*.coffee'));
    listCont = (await (async function() {
      var i, len, results;
      results = [];
      for (i = 0, len = listSource.length; i < len; i++) {
        source = listSource[i];
        results.push((await $.read_(source)));
      }
      return results;
    })());
    $.info().resume();
    listResult = [];
    for (i = 0, len = listFn.length; i < len; i++) {
      fn = listFn[i];
      isUsed = false;
      for (j = 0, len1 = listCont.length; j < len1; j++) {
        cont = listCont[j];
        if (cont.includes(`$.${fn}`)) {
          isUsed = true;
          break;
        }
      }
      if (!isUsed) {
        listResult.push(`'$.${fn}' is not used`);
      }
    }
    // report
    if (!listResult.length) {
      return this;
    }
    listResult = _.uniq(listResult);
    for (k = 0, len2 = listResult.length; k < len2; k++) {
      line = listResult[k];
      $.info(line);
    }
    return this;
  };

}).call(this);
