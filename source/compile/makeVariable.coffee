$ = require 'fire-keeper'

module.exports = (path) ->

  pathSource = $.getDirname path
  basename = $.getBasename path
  pathTarget = [
    pathSource.replace /\/source/, '/src'
    '/'
    basename
    '.vue'
  ].join ''

  # return
  {basename, pathSource, pathTarget}