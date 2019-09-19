(function() {
  module.exports = function(cont) {
    return cont.replace(/throw/g, 'throw new Error').replace(/new Error new Error/g, 'new Error');
  };

}).call(this);
