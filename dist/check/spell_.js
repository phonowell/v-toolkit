(function() {
  var $, _, path;

  _ = require('lodash');

  $ = require('fire-keeper');

  path = require('path');

  // return
  module.exports = async function() {
    var cont, data, i, j, k, l, len, len1, len2, line, listCont, listResult, listSource, rule, source;
    $.info("check 'spell'");
    $.info().pause();
    data = (await $.read_(path.resolve(__dirname, '../../data/spell.yaml')));
    listSource = (await $.source_(['./*.coffee', './dist/**/*.coffee', './dist/**/*.pug', './dist/**/*.styl', './task/**/*.coffee', './test/**/*.coffee', './toolkit/**/*.coffee']));
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
      for (k = 0, len1 = data.length; k < len1; k++) {
        rule = data[k];
        if (cont.includes(rule)) {
          listResult.push(`found '${rule}' in '${source}'`);
        }
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
