# function

signSpa = (cont) ->

  if ~cont.search 'beforeRouteLeave:'
    return cont

  unless ~cont.search 'leave ='
    return cont

  # return
  [
    cont
    '  beforeRouteLeave: (to, from, next) ->'
    '    await @leave? to, from'
    '    next()'
  ].join '\n'

signMp = (cont) ->

  if ~cont.search 'onHide:'
    return cont

  unless ~cont.search 'leave ='
    return cont

  # return
  [
    cont
    '  onHide: -> @leave?()'
  ].join '\n'

# return
module.exports = (cont, path, type) ->

  unless ~path.search 'component'
    return cont

  unless ~path.search 'index.coffee'
    return cont

  unless cont
    return ''

  # return
  switch type
    when 'spa' then signSpa cont
    when 'mp' then signMp cont
    else throw new Error "signLeave/error: invalid type '#{type}'"