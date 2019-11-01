_ = require 'lodash'

module.exports = (cont) ->

  unless cont
    return ''

  unless ~cont.search /\$\.\w/
    return cont

  listReplace = []
  cont = cont.replace /\$\.(\w+?)[\s\(]/g, (text, name) ->
    listReplace.push name
    text # return

  prefix = '$ = {}'
  listReplace = _.uniq listReplace
  for name in listReplace
    
    nameCapital = "_fn#{_.capitalize name}"

    prefix = [
      prefix
      "import #{nameCapital} from '@/function/#{name}'"
      "$.#{name} = #{nameCapital}"
    ].join '\n'

  # return
  [
    prefix
    cont
  ].join '\n'