(function() {
  module.exports = function(cont, path) {
    var i, len, line, listResult, name, ref, ref1, ref2, result;
    if (!~path.search('component')) {
      return cont;
    }
    if (!cont) {
      return '';
    }
    if (~cont.search('methods:')) {
      return cont;
    }
    if (!~cont.search(/\w+ = .*\-\>/)) {
      return cont;
    }
    listResult = [];
    ref = cont.split('\n');
    for (i = 0, len = ref.length; i < len; i++) {
      line = ref[i];
      if (!((ref1 = line[0]) != null ? ref1.trim() : void 0)) {
        continue;
      }
      if ((ref2 = line[0]) === '#' || ref2 === '$' || ref2 === '_') {
        continue;
      }
      if (line[0] !== line[0].toLowerCase()) {
        continue;
      }
      if (!(result = line.match(/\w+ = .*\-\>/g))) {
        continue;
      }
      [name] = result[0].split('=');
      listResult.push(name.trim());
    }
    // return
    return [cont, `  methods: {${listResult.join(', ')}}`].join('\n');
  };

}).call(this);
