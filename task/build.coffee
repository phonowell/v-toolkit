$ = require 'fire-keeper'

# return
module.exports = ->

  await $.chain $
  .remove_ [
    './dist'
    './index.js'
  ]
  .compile_ './source/**/*.coffee', './dist',
    minify: false
  .move_ './dist/index.js', './'