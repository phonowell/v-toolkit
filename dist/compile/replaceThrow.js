(function() {
  module.exports = function(cont) {
    var i, j, len, line, listBoolean, listCont;
    if (!cont) {
      return '';
    }
    listBoolean = [cont.includes('throw'), cont.includes('reject')];
    if (!listBoolean.includes(true)) {
      return cont;
    }
    listCont = cont.split('\n');
    for (i = j = 0, len = listCont.length; j < len; i = ++j) {
      line = listCont[i];
      if (line.trim()[0] === '#') {
        continue;
      }
      listBoolean = [line.includes('throw '), line.includes('reject '), line.endsWith('throw'), line.endsWith('reject')];
      if (!listBoolean.includes(true)) {
        continue;
      }
      listCont[i] = line.replace(/throw\s/g, 'throw new Error ').replace(/reject\s/g, 'reject new Error ').replace(/new Error new Error/g, 'new Error');
    }
    // return
    return listCont.join('\n');
  };

}).call(this);
