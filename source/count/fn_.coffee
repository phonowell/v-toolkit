$ = require 'fire-keeper'

# return
module.exports = (cont) ->

  unless cont
    return cont

  listSource = await $.source_ './source/function/*.coffee'
  listSource.sort()

  _cont = []
  
  for source in listSource
  
    name = $.getBasename source

    _cont = [
      _cont...
      "- [$.#{name}()](../source/function/#{name}.coffee)"
    ]

  # return
  [
    cont...
    '## 函数'
    ''
    "共计#{listSource.length}个函数。"
    ''
    _cont...
    ''
  ]