(function() {
  module.exports = function(cont, path) {
    if (!~path.search('component')) {
      return cont;
    }
    if (!~path.search('index.coffee')) {
      return cont;
    }
    if (!cont) {
      return '';
    }
    if (~cont.search('beforeRouteEnter:')) {
      return cont;
    }
    // return
    return [cont, '  beforeRouteEnter: (to, from, next) ->', '    next (vm) -> vm.enter? to, from'].join('\n');
  };

}).call(this);
