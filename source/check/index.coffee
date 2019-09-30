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
    'class_'
    'spell_'
    'throw_'
  ]
  fn: {}

  # ---

  check_: (feature) ->

    type = $.type feature
    if type == 'string'
      feature = [feature]

    for name in feature or @feature
      await do (name) =>
      
        unless name
          return

        unless name.endsWith '_'
          name = "#{name}_"
        
        unless fn_ = @fn[name]
          return
        
        await fn_()

    @ # return

# return
module.exports = (arg...) ->
  m = new M arg...
  m.check_.bind m