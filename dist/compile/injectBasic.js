(function() {
  module.exports = function(cont) {
    if (!cont) {
      return '';
    }
    // return
    return ["@import '~@/copies/basic'", cont].join('\n');
  };

}).call(this);
