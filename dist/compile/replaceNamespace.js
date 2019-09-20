(function() {
  var $;

  $ = require('fire-keeper');

  module.exports = function(cont, path) {
    var basename;
    if (!~path.search('component')) {
      return cont;
    }
    if (!~path.search('index.')) {
      return cont;
    }
    if (!cont) {
      return '';
    }
    basename = $.getBasename($.getDirname(path));
    // return
    return cont.replace(/(#[\w-]+)/g, function(string) {
      if ((parseInt(string.slice(1), 16)) >= 0) {
        return string;
      }
      return `${string}-${basename}`;
    });
  };

}).call(this);
