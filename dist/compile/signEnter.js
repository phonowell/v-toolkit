(function() {
  // function
  var signMp, signSpa;

  signSpa = function(cont) {
    if (~cont.search('beforeRouteEnter:')) {
      return cont;
    }
    // return
    return [cont, '  beforeRouteEnter: (to, from, next) ->', '    next (vm) -> vm.enter? to, from'].join('\n');
  };

  signMp = function(cont) {
    if (~cont.search('onShow:')) {
      return cont;
    }
    // return
    return [cont, '  onShow: ->@enter?()'].join('\n');
  };

  // return
  module.exports = function(cont, path, type) {
    if (!~path.search('component')) {
      return cont;
    }
    if (!~path.search('index.coffee')) {
      return cont;
    }
    if (!cont) {
      return '';
    }
    // return
    switch (type) {
      case 'spa':
        return signSpa(cont);
      case 'mp':
        return signMp(cont);
      default:
        throw new Error(`signEnter/error: invalid type '${type}'`);
    }
  };

}).call(this);
