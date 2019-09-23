module.exports = (cont) ->

  unless cont
    return ''

  # return
  [
    "@import '~@/include/basic'"
    cont
  ].join '\n'