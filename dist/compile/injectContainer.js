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
    if (~cont.search('page#page')) {
      return cont;
    }
    if (~cont.search('.page')) {
      return cont;
    }
    container = (function() {
      switch (type) {
        case 'single':
          return 'page#page';
        case 'mp':
          return '.page';
        default:
          throw new Error(`injectContainer/error: invalid type ${type}`);
      }
    })();
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
