(function() {
  module.exports = function(cont, list) {
    var _name, component, i, j, len, name, path, prefix, source;
    if (!cont) {
      return '';
    }
    if (!list) {
      return cont;
    }
    if (~cont.search('components:')) {
      return cont;
    }
    prefix = '';
    component = '';
    for (i = j = 0, len = list.length; j < len; i = ++j) {
      source = list[i];
      [name, path] = source.split(' ');
      _name = `_xComponent${i}`;
      prefix = [prefix, `import ${_name} from '@/component/${path}.vue'`].join('\n');
      component = [component, `'${name}': ${_name}`].join(', ');
    }
    cont = [prefix, cont].join('\n');
    // return
    return [cont, `  components: {${component}}`].join('\n');
  };

}).call(this);
