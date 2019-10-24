$ = require 'fire-keeper'

# return
module.exports = ->

  $.info "check 'fn'"

  $.info().pause()

  listFn = await $.source_ './source/fn/*.coffee'
  listFn = ($.getBasename source for source in listFn)

  listSource = await $.source_ './source/**/*.coffee'
  listCont = (await $.read_ source for source in listSource)

  $.info().resume()

  listResult = []

  for fn in listFn

    isUsed = false

    for cont in listCont

      if cont.includes "$.#{fn}"
        isUsed = true
        break

    unless isUsed
      listResult.push "'$.#{fn}' is not used"

  # report

  unless listResult.length
    return @

  listResult = _.uniq listResult
  for line in listResult
    $.info line

  @ # return