module.exports = (cont, list) ->

  unless cont
    return ''

  unless list
    return cont

  if cont.includes 'components:'
    return cont

  prefix = ''
  component = ''
  for source, i in list

    [name, path] = source.split ' '
    _name = "_xComponent#{i}"

    prefix = [
      prefix
      "import #{_name} from '@/component/#{path}.vue'"
    ].join '\n'

    component = [
      component
      "'#{name}': #{_name}"
    ].join ', '

  cont = [
    prefix
    cont
  ].join '\n'

  # return
  [
    cont
    "  components: {#{component}}"
  ].join '\n'