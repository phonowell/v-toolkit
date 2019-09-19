(function() {
  var _;

  _ = require('lodash');

  module.exports = function(cont) {
    var listReplace;
    if (!cont) {
      return '';
    }
    if (!~cont.search(/inject = '/)) {
      return cont;
    }
    listReplace = [];
    cont = cont.replace(/inject = '(.*?)'/g, function(text, string) {
      listReplace.push(string);
      return ''; // return
    });
    listReplace = _.uniq(listReplace);
    cont = new String(cont);
    cont.component = listReplace;
    return cont; // return
  };

}).call(this);
