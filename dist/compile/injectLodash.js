(function() {
  var _;

  _ = require('lodash');

  module.exports = function(cont) {
    var i, len, listReplace, name, nameCapital, prefix;
    if (!cont) {
      return '';
    }
    if (!~cont.search(/_\.\w/)) {
      return cont;
    }
    listReplace = [];
    cont = cont.replace(/_\.(\w+?)[\s\(]/g, function(text, name) {
      listReplace.push(name);
      return text; // return
    });
    prefix = '_ = {}';
    listReplace = _.uniq(listReplace);
    for (i = 0, len = listReplace.length; i < len; i++) {
      name = listReplace[i];
      nameCapital = `_fn${_.capitalize(name)}`;
      prefix = [prefix, `import ${nameCapital} from 'lodash/${name}'`, `_.${name} = ${nameCapital}`].join('\n');
    }
    cont = [prefix, cont].join('\n');
    return cont; // return
  };

}).call(this);
