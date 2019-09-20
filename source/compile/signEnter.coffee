module.exports = (cont, path) ->

  unless ~path.search 'component'
    return cont

  unless ~path.search 'index.coffee'
    return cont

  unless cont
    return ''

  if ~cont.search 'beforeRouteEnter:'
    return cont

  # return
  [
    cont
    '  beforeRouteEnter: (to, from, next) ->'
    '    next (vm) -> vm.enter? to, from'
  ].join '\n'