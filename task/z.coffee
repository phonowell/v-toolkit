_ = require 'lodash'
$ = require 'fire-keeper'

vt = require '../index'
check_ = vt 'check'

# return
module.exports = ->
  
  await check_ 'spell'