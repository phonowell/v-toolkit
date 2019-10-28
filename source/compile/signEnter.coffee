# function

signSpa = (cont) ->

  if cont.includes 'beforeRouteEnter:'
    return cont

  # return
  [
    cont
    '  beforeRouteEnter: (to, from, next) ->'
    '    next (vm) ->'
    '      vm.$refs.page.enter()'
    '      vm.enter? to, from'
  ].join '\n'

signMp = (cont) ->

  if cont.includes 'onShow:'
    return cont

  unless cont.includes 'enter ='
    return cont

  # return
  [
    cont
    '  onShow: -> @enter?()'
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
    else throw new Error "signEnter/error: invalid type '#{type}'"