(function() {
  var $;

  $ = require('fire-keeper');

  // return
  module.exports = function(cont) {
    if (!cont) {
      return '';
    }
    // assign
    // now
    return cont = cont.replace(/[_$]\.assign/g, 'Object.assign').replace(/[_$]\.now\(\)/g, 'new Date().getTime()');
  };

}).call(this);
