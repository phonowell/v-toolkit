(function() {
  var $, M, _, coffee, pug,
    indexOf = [].indexOf;

  _ = require('lodash');

  $ = require('fire-keeper');

  pug = require('pug');

  coffee = require('coffeescript');

  M = (function() {
    // function
    class M {
      constructor(name1 = 'default') {
        var i, j, key, len, len1, ref, ref1;
        this.name = name1;
        ref = this.feature;
        // inject
        for (i = 0, len = ref.length; i < len; i++) {
          key = ref[i];
          ((key) => {
            var path;
            path = require('path');
            this.fn[key] = require(path.resolve(__dirname, key));
            return this[key] = (...arg) => {
              if (!this.enabled[key]) {
                return arg[0];
              }
              return this.fn[key](...arg);
            };
          })(key);
        }
        ref1 = this.setFeature(this.name);
        // feature
        for (j = 0, len1 = ref1.length; j < len1; j++) {
          key = ref1[j];
          this.enabled[key] = true;
        }
        this; // return
      }

      // ---
      async compileCoffee_(path, option = {}) {
        var contCoffee;
        contCoffee = (await $.read_(path));
        contCoffee = _.trim(contCoffee || '');
        contCoffee = this.signEnter(contCoffee, path, this.name);
        contCoffee = this.signLeave(contCoffee, path, this.name);
        contCoffee = this.signMethod(contCoffee, path);
        contCoffee = this.injectLodash(contCoffee);
        contCoffee = this.injectFn(contCoffee);
        contCoffee = this.injectComponent(contCoffee, option.component);
        contCoffee = this.replaceError(contCoffee);
        contCoffee = this.replaceExport(contCoffee);
        // return
        return coffee.compile(contCoffee);
      }

      async compilePug_(path) {
        var contHtml, contPug;
        contPug = (await $.read_(path));
        contPug = _.trim(contPug || '');
        contPug = this.injectContainer(contPug, path, this.name);
        contPug = this.injectComponentGlobal(contPug);
        contPug = this.replaceNamespace(contPug, path);
        contPug = this.signComponent(contPug);
        contHtml = new String((pug.compile(contPug))());
        contHtml.component = contPug.component;
        return contHtml; // return
      }

      async compileStyl_(path) {
        var contStyl;
        contStyl = (await $.read_(path));
        contStyl = _.trim(contStyl || '');
        contStyl = this.replaceNamespace(contStyl, path);
        contStyl = this.injectBasic(contStyl);
        contStyl = new String(contStyl);
        contStyl.isScoped = !(contStyl.search(/\s*\/{2}\s*@scope/));
        return contStyl; // return
      }

      async compile_(path) {
        var basename, contHtml, contJs, contJson, contResult, contStyl, pathSource, pathTarget, type;
        // check type of path
        type = $.type(path);
        if (type !== 'string') {
          throw new Error(`compiler/error: invalid type of path: '${type}'`);
        }
        // check path
        if (!(await $.isExisted_(path))) {
          throw new Error(`compiler/error: invalid path: '${path}'`);
        }
        // variable
        ({basename, pathSource, pathTarget} = this.makeVariable(path));
        $.info().pause();
        contJson = (await $.read_(`${pathSource}/${basename}.yaml`));
        contHtml = (await this.compilePug_(`${pathSource}/${basename}.pug`));
        contStyl = (await this.compileStyl_(`${pathSource}/${basename}.styl`));
        contJs = (await this.compileCoffee_(`${pathSource}/${basename}.coffee`, {
          component: contHtml.component
        }));
        contResult = [];
        if (_.size(contJson)) {
          contResult = [...contResult, '<config>', $.parseString(contJson), '</config>'];
        }
        if (contHtml.length) {
          contResult = [...contResult, '<template>', contHtml, '</template>'];
        }
        if (contStyl.length) {
          contResult = [...contResult, (contStyl.isScoped ? '<style lang="stylus" scoped>' : '<style lang="stylus">'), contStyl, '</style>'];
        }
        if (contJs.length) {
          contResult = [...contResult, '<script>', contJs, '</script>'];
        }
        await $.write_(pathTarget, contResult.join('\n'));
        $.info().resume();
        $.info(`made '${pathTarget}'`);
        return this;
      }

      setFeature(name) {
        var listDisabled, listFeature;
        listDisabled = (function() {
          switch (name) {
            case 'default':
              return ['injectComponentGlobal', 'injectContainer', 'replaceNamespace'];
            case 'mp':
              return ['replaceNamespace'];
            case 'spa':
              return ['injectComponentGlobal'];
            default:
              throw new Error(`compile/error: invalid name '${name}'`);
          }
        })();
        listFeature = [...this.feature];
        _.remove(listFeature, function(n) {
          return indexOf.call(listDisabled, n) >= 0;
        });
        return listFeature; // return
      }

    };

    /*
    enabled
    feature
    fn
    ---
    compileCoffee_(path, option)
    compilePug_(path)
    compileStyl_(path)
    compile_(path)
    setFeature(key)
    */
    M.prototype.enabled = {};

    M.prototype.feature = ['injectBasic', 'injectComponent', 'injectComponentGlobal', 'injectContainer', 'injectFn', 'injectLodash', 'makeVariable', 'replaceError', 'replaceExport', 'replaceNamespace', 'signComponent', 'signEnter', 'signLeave', 'signMethod'];

    M.prototype.fn = {};

    return M;

  }).call(this);

  
  // return
  module.exports = function(...arg) {
    var fn_, m;
    m = new M(...arg);
    fn_ = m.compile_.bind(m);
    fn_.coffee_ = m.compileCoffee_.bind(m);
    return fn_; // return
  };

}).call(this);
