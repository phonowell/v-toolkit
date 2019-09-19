(function() {
  var $, M, path;

  $ = require('fire-keeper');

  path = require('path');

  M = (function() {
    // function
    class M {
      constructor() {
        var i, key, len, ref;
        ref = this.feature;
        for (i = 0, len = ref.length; i < len; i++) {
          key = ref[i];
          ((key) => {
            return this.fn[key] = require(path.resolve(__dirname, key));
          })(key);
        }
        this; // return
      }

      // ---
      async replace_(key, ...arg) {
        key || (key = 'replace');
        await this.fn[`${key}_`](...arg);
        return this;
      }

    };

    /*
    feature
    fn
    ---
    replace_(key)
    */
    M.prototype.feature = ['config_', 'replace_'];

    M.prototype.fn = {};

    return M;

  }).call(this);

  
  // return
  module.exports = function(...arg) {
    var m;
    m = new M(...arg);
    return m.replace_.bind(m);
  };

}).call(this);
