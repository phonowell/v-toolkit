_ = require 'lodash'
$ = require 'fire-keeper'

axios = require 'axios'

# return
module.exports = ->

  $.info "check 'api'"
  
  $.info().pause()
  listSource = await $.source_ './data/api/**/*.yaml'
  listCont = (await $.read_ source for source in listSource)
  $.info().resume()

  listResult = []

  for source, i in listSource

    name = $.getBasename source
    cont = listCont[i]

    for key, value of cont
      unless value.doc?.length
        listResult.push "found no 'doc' in '#{name}/#{key}'"
      unless value.mock?.length
        listResult.push "found no 'mock' in '#{name}/#{key}'"

      try
        
        data = await axios[value.method] value.mock
        unless data.data.code == 200
          $.i data.data
          throw new Error()
      
      catch e
        listResult.push "'mock' could not work in '#{name}/#{key}':
        '#{value.url}'"

  # report

  unless listResult.length
    return @

  listResult = _.uniq listResult
  for line in listResult
    $.info line

  @ # return