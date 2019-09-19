(function() {
  var $;

  $ = require('fire-keeper');

  module.exports = function(path) {
    var basename, pathSource, pathTarget;
    pathSource = $.getDirname(path);
    basename = $.getBasename(path);
    pathTarget = [pathSource.replace(/\/source/, '/src'), '/', basename, '.vue'].join('');
    // return
    return {basename, pathSource, pathTarget};
  };

}).call(this);
