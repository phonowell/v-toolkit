module.exports = (cont, path) ->

  unless ~path.search 'index.pug'
    return cont

  unless cont
    return ''

  # return
  [
    '.page'
    ("  #{line}" for line in cont.split '\n')...
  ].join '\n'