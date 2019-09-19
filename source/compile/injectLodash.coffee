_ = require 'lodash'

module.exports = (cont) ->

  unless cont
    return ''

  unless ~cont.search /_\.\w/
    return cont

  listReplace = []
  cont = cont.replace /_\.(\w+?)[\s\(]/g, (text, name) ->
    listReplace.push name
    text # return

  prefix = '_ = {}'
  listReplace = _.uniq listReplace
  for name in listReplace
    nameCapital = "_fn#{_.capitalize name}"

    prefix = [
      prefix
      "import #{nameCapital} from 'lodash/#{name}'"
      "_.#{name} = #{nameCapital}"
    ].join '\n'

  cont = [
    prefix
    cont
  ].join '\n'
  cont # return