(function() {
  module.exports = function(cont) {
    if (!cont) {
      return '';
    }
    // return
    return ["@import '~@/include/basic'", cont].join('\n');
  };

}).call(this);
