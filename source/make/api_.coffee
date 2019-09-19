$ = require 'fire-keeper'

# return
module.exports = ->

  result = {}

  for source in await $.source_ './data/api/*.yaml'
    
    name = $.getBasename source
    data = await $.read_ source

    for key, value of data
      
      delete value.doc
      delete value.mock
      
      result["#{name}/#{key}"] = value

  contJs = "export default #{$.parseString result};"
  await $.write_ './src/module/api.js', contJs