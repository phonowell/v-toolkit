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
      async check_() {
        await $.chain(this.fn).spell_().await_().api_();
        return this;
      }

    };

    /*
    feature
    fn
    ---
    check_()
    */
    M.prototype.feature = ['api_', 'await_', 'spell_'];

    M.prototype.fn = {};

    return M;

  }).call(this);

  
  // return
  module.exports = function(...arg) {
    var m;
    m = new M(...arg);
    return m.check_.bind(m);
  };

}).call(this);
