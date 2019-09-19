module.exports = (cont) ->

  unless cont
    return ''

  # return
  [
    "@import '~@/copies/basic'"
    cont
  ].join '\n'