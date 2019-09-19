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
  replace_(key)
  ###

  feature: [
    'config_'
    'replace_'
  ]
  fn: {}

  # ---

  replace_: (key, arg...) ->

    unless key
      return @fn.replace_

    await @fn["#{key}_"] arg...
    @ # return

# return
module.exports = (arg...) ->
  m = new M arg...
  m.replace_.bind m