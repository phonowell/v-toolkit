$ = require 'fire-keeper'

# return
module.exports = (cont) ->

  unless cont
    return cont

  listSource = await $.source_ './source/component/**/index.pug'
  listSource.sort()

  _cont = []

  for source in listSource

    name = $.getBasename $.getDirname source
    
    _cont = [
      _cont...
      "- #{name}:
      [.pug](../source/component/#{name}/index.pug)
      /
      [.styl](../source/component/#{name}/index.styl)
      /
      [.coffee](../source/component/#{name}/index.coffee)"
    ]

  # return
  [
    cont...
    '## 页面'
    ''
    "共计#{listSource.length}个页面。"
    ''
    _cont...
    ''
  ]