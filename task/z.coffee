_ = require 'lodash'
$ = require 'fire-keeper'

vt = require '../index'
compile_ = vt 'compile', 'single'

# return
module.exports = ->
  
  await compile_ './temp/component/test/index.pug'