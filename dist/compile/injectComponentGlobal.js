(function() {
  module.exports = function(cont) {
    var i, key, len, ref;
    if (!cont) {
      return '';
    }
    ref = ['router-link', 'thumb'];
    for (i = 0, len = ref.length; i < len; i++) {
      key = ref[i];
      (function(key) {
        if (!cont.includes(key)) {
          return;
        }
        return cont = [`//- inject = '${key} global/${key}'`, cont].join('\n');
      })(key);
    }
    return cont; // return
  };

}).call(this);
