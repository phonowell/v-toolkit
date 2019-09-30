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
      async check_(feature) {
        var i, len, name, ref, type;
        type = $.type(feature);
        if (type === 'string') {
          feature = [feature];
        }
        ref = feature || this.feature;
        for (i = 0, len = ref.length; i < len; i++) {
          name = ref[i];
          await (async(name) => {
            var fn_;
            if (!name) {
              return;
            }
            if (!name.endsWith('_')) {
              name = `${name}_`;
            }
            if (!(fn_ = this.fn[name])) {
              return;
            }
            return (await fn_());
          })(name);
        }
        return this;
      }

    };

    /*
    feature
    fn
    ---
    check_()
    */
    M.prototype.feature = ['api_', 'await_', 'class_', 'spell_', 'throw_'];

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
