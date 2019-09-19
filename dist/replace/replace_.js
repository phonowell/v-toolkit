(function() {
  var $;

  $ = require('fire-keeper');

  // return
  module.exports = async function(string, fn) {
    var cont, type;
    // check type
    type = $.type(string);
    if (type !== 'string') {
      throw new Error(`invalid type '${type}'`);
    }
    type = $.type(fn);
    if (type !== 'function') {
      throw new Error(`invalid type '${type}'`);
    }
    cont = (await $.read_(string));
    cont = fn(cont);
    // write
    return (await $.write_(string, cont));
  };

}).call(this);
