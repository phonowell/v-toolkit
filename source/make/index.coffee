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
  make_(key)
  ###

  feature: [
    'api_'
    'component_'
    'region_'
  ]
  fn: {}

  # ---

  make_: (key) ->
    await @fn["#{key}_"]()
    @ # return

# return
module.exports = (arg...) ->
  m = new M arg...
  m.make_.bind m