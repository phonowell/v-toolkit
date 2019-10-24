(function() {
  var $;

  $ = require('fire-keeper');

  module.exports = function(cont, path) {
    var basename;
    if (!path.includes('component')) {
      return cont;
    }
    if (!path.includes('index.')) {
      return cont;
    }
    if (!cont) {
      return '';
    }
    basename = $.getBasename($.getDirname(path));
    // return
    return cont.replace(/(#[\w-]+)/g, function(string) {
      if (!string.slice(1).replace(/[0123456789abcdef]/g, '')) {
        return string;
      }
      return `${string}-${basename}`;
    });
  };

}).call(this);
