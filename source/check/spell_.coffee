_ = require 'lodash'
$ = require 'fire-keeper'
path = require 'path'

# return
module.exports = ->

  $.info "check 'spell'"

  $.info().pause()
  data = await $.read_ path.resolve __dirname, '../../data/spell.yaml'
  listSource = await $.source_ [
    './*.coffee'
    './dist/**/*.coffee'
    './dist/**/*.pug'
    './dist/**/*.styl'
    './task/**/*.coffee'
    './test/**/*.coffee'
    './toolkit/**/*.coffee'
  ]
  listCont = (await $.read_ source for source in listSource)
  $.info().resume()

  listResult = []

  for source, i in listSource

    cont = listCont[i]

    for rule in data
      if ~cont.search rule
        listResult.push "found '#{rule}' in '#{source}'"

  unless listResult.length
    return @

  listResult = _.uniq listResult
  for line in listResult
    $.info line

  @ # return