(function() {
  module.exports = function(cont, path, type) {
    var container, line;
    if (!path.includes('component')) {
      return cont;
    }
    if (!path.includes('index.pug')) {
      return cont;
    }
    if (!cont) {
      return '';
    }
    if (type === 'mp') {
      container = '.page';
    } else if (type === 'spa') {
      container = 'page#page';
      if (cont.includes(container)) {
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
