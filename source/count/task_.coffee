$ = require 'fire-keeper'

# return
module.exports = (cont) ->

  unless cont
    return cont

  listSource = await $.source_ './task/*.coffee'
  listSource.sort()

  _cont = []

  for source in listSource
    
    name = $.getBasename source
    
    _cont = [
      _cont...
      "- [#{name}](../task/#{name}.coffee)"
    ]

  # return
  [
    cont...
    '## 任务'
    ''
    "共计#{listSource.length}个任务。"
    ''
    _cont...
    ''
  ]