$ = require 'fire-keeper'
path = require 'path'

replace_ = require path.resolve __dirname, 'replace_'

# return
module.exports = (target = 'development') ->

  data = await $.read_ './data/config.yaml'
  
  await $.compile_ './source/module/config.coffee', './src',
    base: './source'

  await replace_ './src/module/config.js', (cont) ->
    
    for key, value of data

      cont = cont
      .replace "{{#{key}}}", value[target]

    cont # return