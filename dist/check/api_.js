(function() {
  var $, _, axios;

  _ = require('lodash');

  $ = require('fire-keeper');

  axios = require('axios');

  // return
  module.exports = async function() {
    var cont, data, e, i, j, k, key, len, len1, line, listCont, listResult, listSource, name, ref, ref1, source, value;
    $.info("check 'api'");
    $.info().pause();
    listSource = (await $.source_('./data/api/**/*.yaml'));
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
      name = $.getBasename(source);
      cont = listCont[i];
      for (key in cont) {
        value = cont[key];
        if (!((ref = value.doc) != null ? ref.length : void 0)) {
          listResult.push(`found no 'doc' in '${name}/${key}'`);
        }
        if (!((ref1 = value.mock) != null ? ref1.length : void 0)) {
          listResult.push(`found no 'mock' in '${name}/${key}'`);
        }
        try {
          data = (await axios[value.method](value.mock));
          if (data.data.code !== 200) {
            $.i(data.data);
            throw new Error();
          }
        } catch (error) {
          e = error;
          listResult.push(`'mock' could not work in '${name}/${key}': '${value.url}'`);
        }
      }
    }
    // report
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
