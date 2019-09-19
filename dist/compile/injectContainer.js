(function() {
  module.exports = function(cont, path) {
    var line;
    if (!~path.search('index.pug')) {
      return cont;
    }
    if (!cont) {
      return '';
    }
    return [
      // return
      '.page',
      ...((function() {
        var i,
      len,
      ref,
      results;
        ref = cont.split('\n');
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          line = ref[i];
          results.push(`  ${line}`);
        }
        return results;
      })())
    ].join('\n');
  };

}).call(this);
