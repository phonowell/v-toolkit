$ = require 'fire-keeper'

# return
module.exports = (cont) ->

  unless cont
    return cont

  listSource = await $.source_ './data/api/**/*.yaml'
  listSource.sort()

  _cont = []
  count = 0

  for source in listSource

    basename = $.getBasename source

    list = await $.read_ source
    for key, value of list

      _cont = [
        _cont...
        "- #{basename}/#{key}:
        #{value.url}
        [document](#{value.doc})
        /
        [mock](#{value.mock})"
      ]
      count++

  # return
  [
    cont...
    '## 接口'
    ''
    "共计#{count}个接口。"
    ''
    _cont...
    ''
  ]