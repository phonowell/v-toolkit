_ = require 'lodash'

module.exports = (cont) ->
  
    unless cont
      return ''

    unless ~cont.search /inject = '/
      return cont

    listReplace = []
    cont = cont.replace /inject = '(.*?)'/g, (text, string) ->
      listReplace.push string
      '' # return
    listReplace = _.uniq listReplace

    cont = new String cont
    cont.component = listReplace
    cont # return