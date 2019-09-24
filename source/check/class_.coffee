_ = require 'lodash'
$ = require 'fire-keeper'

# return
module.exports = ->

  $.info "check 'class'"

  $.info().pause()
  listSource = await $.source_ './source/component/**/index.styl'
  listCont = (await $.read_ source for source in listSource)
  $.info().resume()

  listResult = []

  for source, i in listSource

    cont = listCont[i]

    for line, i in cont.split '\n'
      
      unless line[0] == '.'
        continue
      listResult.push "'#{source}' line #{i}: #{line}"

  unless listResult.length
    return @

  listResult = _.uniq listResult
  for line in listResult
    $.info line

  @ # return