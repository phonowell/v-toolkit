(function() {
  var $, path, replace_;

  $ = require('fire-keeper');

  path = require('path');

  replace_ = require(path.resolve(__dirname, 'replace_'));

  // return
  module.exports = async function(target = 'development') {
    var data;
    data = (await $.read_('./data/config.yaml'));
    await $.compile_('./source/module/config.coffee', './src', {
      base: './source'
    });
    return (await replace_('./src/module/config.js', function(cont) {
      var key, value;
      for (key in data) {
        value = data[key];
        cont = cont.replace(`{{${key}}}`, value[target]);
      }
      return cont; // return
    }));
  };

}).call(this);
