(function() {
  // function
  var signMp, signSpa;

  signSpa = function(cont) {
    if (cont.includes('beforeRouteEnter:')) {
      return cont;
    }
    // return
    return [cont, '  beforeRouteEnter: (to, from, next) ->', '    next (vm) ->', '      vm.$refs.page.enter()', '      vm.enter? to, from'].join('\n');
  };

  signMp = function(cont) {
    if (cont.includes('onShow:')) {
      return cont;
    }
    if (!cont.includes('enter =')) {
      return cont;
    }
    // return
    return [cont, '  onShow: -> @enter?()'].join('\n');
  };

  // return
  module.exports = function(cont, path, type) {
    if (!path.includes('component')) {
      return cont;
    }
    if (!path.includes('index.coffee')) {
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
