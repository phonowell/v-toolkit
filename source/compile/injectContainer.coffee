module.exports = (cont, path, type) ->

  unless path.includes 'component'
    return cont

  unless path.includes 'index.pug'
    return cont

  unless cont
    return ''

  if type == 'mp'
    container = '.page'

  else if type == 'spa'
    container = 'page#page'
    if cont.includes container
      return cont

  else throw new Error "injectContainer/error: invalid type #{type}"

  # return
  [
    "#{container}(ref = 'page')"
    ("  #{line}" for line in cont.split '\n')...
  ].join '\n'