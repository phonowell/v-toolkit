# function

signSpa = (cont) ->

  if cont.includes 'beforeRouteLeave:'
    return cont

  # return
  [
    cont
    '  beforeRouteLeave: (to, from, next) ->'
    '    await @leave? to, from'
    '    @$refs.page.leave()'
    '    next()'
  ].join '\n'

signMp = (cont) ->

  if cont.includes 'onHide:'
    return cont

  unless cont.includes 'leave ='
    return cont

  # return
  [
    cont
    '  onHide: -> @leave?()'
  ].join '\n'

# return
module.exports = (cont, path, type) ->

  unless path.includes 'component'
    return cont

  unless path.includes 'index.coffee'
    return cont

  unless cont
    return ''

  # return
  switch type
    when 'spa' then signSpa cont
    when 'mp' then signMp cont
    else throw new Error "signLeave/error: invalid type '#{type}'"