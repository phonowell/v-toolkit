(function() {
  // function
  var signMp, signSpa;

  signSpa = function(cont) {
    if (~cont.search('beforeRouteLeave:')) {
      return cont;
    }
    if (!~cont.search('leave =')) {
      return cont;
    }
    // return
    return [cont, '  beforeRouteLeave: (to, from, next) ->', '    await @leave? to, from', '    next()'].join('\n');
  };

  signMp = function(cont) {
    if (~cont.search('onHide:')) {
      return cont;
    }
    if (!~cont.search('leave =')) {
      return cont;
    }
    // return
    return [cont, '  onHide: -> @leave?()'].join('\n');
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
        throw new Error(`signLeave/error: invalid type '${type}'`);
    }
  };

}).call(this);
