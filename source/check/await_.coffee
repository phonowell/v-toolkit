_ = require 'lodash'
$ = require 'fire-keeper'

# function

check = (line) ->

  unless ~line.search /\w+\_/
    return true

  # # fn_
  # .fn_
  if (_.trim line)[0] in ['#', '.']
    return true

  # fn_ =
  if ~line.search /\w+\_ \=/
    return true

  # fn_:
  if ~line.search /\w+\_\:/
    return true

  # fn_/
  if ~line.search /\w+\_\//
    return true

  # fn_ arg
  # fn_()
  unless ~line.search /\w+\_[\s\(]/
    return true

  unless ~line.search 'await'
    return false

  true

# return
module.exports = ->

  $.info "check 'await'"

  $.info().pause()
  listSource = await $.source_ './dist/**/*.coffee'
  listCont = (await $.read_ source for source in listSource)
  $.info().resume()

  listResult = []

  for source, i in listSource

    cont = listCont[i]

    for line, i in cont.split '\n'

      if isFine = check line
        continue
      listResult.push "'#{source}' line #{i}: #{line}"

  unless listResult.length
    return @

  listResult = _.uniq listResult
  for line in listResult
    $.info line

  @ # return