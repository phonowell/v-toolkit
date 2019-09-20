(function() {
  var $;

  $ = require('fire-keeper');

  // return
  module.exports = async function() {
    var cont, data;
    if (!(data = (await $.read_('./data/region.yaml')))) {
      return;
    }
    cont = ['# edit ./data/region.yaml instead', `export default ${$.parseString(data)}`];
    return (await $.write_('./source/module/region.coffee', cont.join('\n')));
  };

}).call(this);
