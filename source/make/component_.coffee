_ = require 'lodash'
$ = require 'fire-keeper'

# return
module.exports = ->

  unless data = await $.read_ './data/component.yaml'
    return

  cont = [
    '# edit ./data/component.yaml instead'
    "import Vue from 'vue'"
  ]

  for key, value of data

    name = "x#{_.capitalize _.camelCase value}"

    cont = [
      cont...
      ''
      "import #{name} from '@/component/global/#{value}.vue'"
      "Vue.component '#{key}', #{name}"
    ]

  await $.write_ './source/module/component.coffee', cont.join '\n'