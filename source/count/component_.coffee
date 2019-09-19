$ = require 'fire-keeper'

# return
module.exports = (cont) ->

  unless cont
    return cont
  
  listSource = await $.source_ [
    './source/component/**/*.pug'
    '!**/index.pug'
  ]
  listSource.sort()

  _cont = []
  
  for source in listSource
  
    name = $.getBasename source
    dirname = $.getBasename $.getDirname source

    _cont = [
      _cont...
      "- #{dirname}/#{name}:
      [.pug](../source/component/#{dirname}/#{name}.pug)
      /
      [.styl](../source/component/#{dirname}/#{name}.styl)
      /
      [.coffee](../source/component/#{dirname}/#{name}.coffee)"
    ]

  # return
  [
    cont...
    '## 组件'
    ''
    "共计#{listSource.length}个组件。"
    ''
    _cont...
    ''
  ]