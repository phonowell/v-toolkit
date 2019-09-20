(function() {
  var $, _;

  _ = require('lodash');

  $ = require('fire-keeper');

  // return
  module.exports = async function() {
    var cont, data, key, name, value;
    if (!(data = (await $.read_('./data/component.yaml')))) {
      return;
    }
    cont = ['# edit ./data/component.yaml instead', "import Vue from 'vue'"];
    for (key in data) {
      value = data[key];
      name = `x${_.capitalize(_.camelCase(value))}`;
      cont = [...cont, '', `import ${name} from '@/component/global/${value}.vue'`, `Vue.component '${key}', ${name}`];
    }
    return (await $.write_('./source/module/component.coffee', cont.join('\n')));
  };

}).call(this);
