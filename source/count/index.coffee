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
  count_()
  ###

  feature: [
    'api_'
    'component_'
    'end'
    'fn_'
    'page_'
    'start'
    'task_'
  ]
  fn: {}

  # ---

  count_: ->

    cont = @fn.start()
    cont = await @fn.api_ cont
    cont = await @fn.page_ cont
    cont = await @fn.component_ cont
    cont = await @fn.fn_ cont
    cont = await @fn.task_ cont
    cont = @fn.end cont

    await $.write_ './doc/index.md'
    , cont.join '\n'

    @ # return

# return
module.exports = (arg...) ->
  m = new M arg...
  m.count_.bind m