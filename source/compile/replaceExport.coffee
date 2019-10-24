$ = require 'fire-keeper'

# return
module.exports = (cont) ->

  unless cont
    return ''

  unless cont.includes 'module.exports ='
    return cont

  # return
  cont
  .replace /module\.exports =/g, 'export default'