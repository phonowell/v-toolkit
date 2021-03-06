_ = require 'lodash'
$ = require 'fire-keeper'

# return
module.exports = ->

  $.info "check 'throw'"

  $.info().pause()
  listSource = await $.source_ './source/**/*.coffee'
  listCont = (await $.read_ source for source in listSource)
  $.info().resume()

  listResult = []

  for source, i in listSource

    cont = listCont[i]

    unless cont.includes 'throw '
      continue

    if cont.includes 'throw new Error'
      continue

    unless cont.includes 'try'
      listResult.push source

    unless cont.includes 'catch'
      listResult.push source

  unless listResult.length
    return @

  listResult = _.uniq listResult
  for line in listResult
    $.info line

  @ # return