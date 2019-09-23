# function

signSpa = (cont) ->

  if ~cont.search 'beforeRouteEnter:'
    return cont

  # return
  [
    cont
    '  beforeRouteEnter: (to, from, next) ->'
    '    next (vm) -> vm.enter? to, from'
  ].join '\n'

signMp = (cont) ->

  if ~cont.search 'onShow:'
    return cont

  # return
  [
    cont
    '  onShow: ->@enter?()'
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
    else throw new Error "signEnter/error: invalid type '#{type}'"