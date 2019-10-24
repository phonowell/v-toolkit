(function() {
  var $, _;

  _ = require('lodash');

  $ = require('fire-keeper');

  // return
  module.exports = async function() {
    var cont, i, j, k, len, len1, line, listCont, listResult, listSource, source;
    $.info("check 'throw'");
    $.info().pause();
    listSource = (await $.source_('./source/**/*.coffee'));
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
      if (!cont.includes('throw ')) {
        continue;
      }
      if (cont.includes('throw new Error')) {
        continue;
      }
      if (!cont.includes('try')) {
        listResult.push(source);
      }
      if (!cont.includes('catch')) {
        listResult.push(source);
      }
    }
    if (!listResult.length) {
      return this;
    }
    listResult = _.uniq(listResult);
    for (k = 0, len1 = listResult.length; k < len1; k++) {
      line = listResult[k];
      $.info(line);
    }
    return this;
  };

}).call(this);
