(function() {
  module.exports = function(cont, path, type) {
    var container, line;
    if (!~path.search('component')) {
      return cont;
    }
    if (!~path.search('index.pug')) {
      return cont;
    }
    if (!cont) {
      return '';
    }
    if (type === 'mp') {
      container = '.page';
    } else if (type === 'spa') {
      container = 'page#page';
      if (~cont.search(container)) {
        return cont;
      }
    } else {
      throw new Error(`injectContainer/error: invalid type ${type}`);
    }
    return [
      // return
      container,
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
