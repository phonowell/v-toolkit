$ = require 'fire-keeper'

# return
module.exports = (cont) ->

  unless cont
    return ''

  cont = cont

  # assign
  .replace /[_$]\.assign/g, 'Object.assign'

  # now
  .replace /[_$]\.now\(\)/g, 'new Date().getTime()'