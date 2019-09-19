(function() {
  var $;

  $ = require('fire-keeper');

  // return
  module.exports = async function() {
    var contJs, data, i, key, len, name, ref, result, source, value;
    result = {};
    ref = (await $.source_('./data/api/*.yaml'));
    for (i = 0, len = ref.length; i < len; i++) {
      source = ref[i];
      name = $.getBasename(source);
      data = (await $.read_(source));
      for (key in data) {
        value = data[key];
        delete value.doc;
        delete value.mock;
        result[`${name}/${key}`] = value;
      }
    }
    contJs = `export default ${$.parseString(result)};`;
    return (await $.write_('./src/module/api.js', contJs));
  };

}).call(this);
