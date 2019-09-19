$ = require 'fire-keeper'

# return
module.exports = ->

  unless data = await $.read_ './data/region.yaml'
    return

  cont = [
    '# edit ./data/region.yaml instead'
    "export default #{$.parseString data}"
  ]

  await $.write_ './source/module/region.coffee', cont.join '\n'