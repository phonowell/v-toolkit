(function() {
  var _;

  _ = require('lodash');

  module.exports = function(cont) {
    var i, len, listReplace, name, nameCapital, prefix;
    if (!cont) {
      return '';
    }
    if (!~cont.search(/\$\.\w/)) {
      return cont;
    }
    listReplace = [];
    cont = cont.replace(/\$\.(\w+?)[\s\(]/g, function(text, name) {
      listReplace.push(name);
      return text; // return
    });
    prefix = '$ = {}';
    listReplace = _.uniq(listReplace);
    for (i = 0, len = listReplace.length; i < len; i++) {
      name = listReplace[i];
      nameCapital = `_fn${_.capitalize(name)}`;
      prefix = [prefix, `import ${nameCapital} from '@/function/${name}'`, `$.${name} = ${nameCapital}`].join('\n');
    }
    cont = [prefix, cont].join('\n');
    return cont; // return
  };

}).call(this);
