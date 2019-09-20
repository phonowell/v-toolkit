module.exports = (cont, path, type) ->

  unless ~path.search 'component'
    return cont

  unless ~path.search 'index.pug'
    return cont

  unless cont
    return ''

  if type == 'mp'
    container = '.page'

  else if type == 'single'
    container = 'page#page'
    if ~cont.search container
      return cont

  else throw new Error "injectContainer/error: invalid type #{type}"

  # return
  [
    container
    ("  #{line}" for line in cont.split '\n')...
  ].join '\n'