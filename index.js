(function() {
  var $, path;

  $ = require('fire-keeper');

  path = require('path');

  module.exports = function(key, ...arg) {
    var m;
    m = require(path.resolve(__dirname, `dist/${key}/index`));
    return m(...arg);
  };

}).call(this);
