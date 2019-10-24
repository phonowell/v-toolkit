(function() {
  var $;

  $ = require('fire-keeper');

  // return
  module.exports = function(cont) {
    if (!cont) {
      return '';
    }
    if (!cont.includes('module.exports =')) {
      return cont;
    }
    // return
    return cont.replace(/module\.exports =/g, 'export default');
  };

}).call(this);
