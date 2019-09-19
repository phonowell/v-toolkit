$ = require 'fire-keeper'
path = require 'path'

# function

class M

  constructor: ->
    for key in @feature
      do (key) =>
        @fn[key] = require path.resolve __dirname, key
    @ # return

  ###
  feature
  fn
  ---
  check_()
  ###

  feature: [
    'api_'
    'await_'
    'spell_'
  ]
  fn: {}

  # ---

  check_: ->

    await $.chain @fn
    .spell_()
    .await_()
    .api_()

    @ # return

# return
module.exports = (arg...) ->
  m = new M arg...
  m.check_.bind m