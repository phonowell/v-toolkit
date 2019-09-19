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
      async count_() {
        var cont;
        cont = this.fn.start();
        cont = (await this.fn.api_(cont));
        cont = (await this.fn.page_(cont));
        cont = (await this.fn.component_(cont));
        cont = (await this.fn.fn_(cont));
        cont = (await this.fn.task_(cont));
        cont = this.fn.end(cont);
        await $.write_('./doc/index.md', cont.join('\n'));
        return this;
      }

    };

    /*
    feature
    fn
    ---
    count_()
    */
    M.prototype.feature = ['api_', 'component_', 'end', 'fn_', 'page_', 'start', 'task_'];

    M.prototype.fn = {};

    return M;

  }).call(this);

  
  // return
  module.exports = function(...arg) {
    var m;
    m = new M(...arg);
    return m.count_.bind(m);
  };

}).call(this);
