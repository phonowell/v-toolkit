(function() {
  var $, _, check;

  _ = require('lodash');

  $ = require('fire-keeper');

  // function
  check = function(line) {
    var ref;
    if (!~line.search(/\w+\_/)) {
      return true;
    }
    // # fn_
    // .fn_
    if ((ref = (_.trim(line))[0]) === '#' || ref === '.') {
      return true;
    }
    if (~line.search(/\w+\_ \=/)) {
      return true;
    }
    if (~line.search(/\w+\_\:/)) {
      return true;
    }
    if (~line.search(/\w+\_\//)) {
      return true;
    }
    if (!~line.search(/\w+\_[\s\(]/)) {
      return true;
    }
    if (!line.includes('await')) {
      return false;
    }
    return true;
  };

  // return
  module.exports = async function() {
    var cont, i, isFine, j, k, l, len, len1, len2, line, listCont, listResult, listSource, ref, source;
    $.info("check 'await'");
    $.info().pause();
    listSource = (await $.source_('./dist/**/*.coffee'));
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
        if (isFine = check(line)) {
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
