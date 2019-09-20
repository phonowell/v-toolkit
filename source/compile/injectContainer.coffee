module.exports = (cont, path, type) ->

  unless ~path.search 'component'
    return cont

  unless ~path.search 'index.pug'
    return cont

  unless cont
    return ''

  if ~cont.search 'page#page'
    return cont

  if ~cont.search '.page'
    return cont

  container = switch type
    when 'single' then 'page#page'
    when 'mp' then '.page'
    else throw new Error "injectContainer/error: invalid type #{type}"

  # return
  [
    container
    ("  #{line}" for line in cont.split '\n')...
  ].join '\n'