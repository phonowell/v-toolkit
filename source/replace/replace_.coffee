$ = require 'fire-keeper'

# return
module.exports = (string, fn) ->

  # check type
  type = $.type string
  unless type == 'string'
    throw new Error "invalid type '#{type}'"

  type = $.type fn
  unless type == 'function'
    throw new Error "invalid type '#{type}'"

  cont = await $.read_ string
  cont = fn cont

  # write
  await $.write_ string, cont