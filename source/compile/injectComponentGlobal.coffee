module.exports = (cont) ->

  unless cont
    return ''

  for key in ['router-link', 'thumb']
    do (key) ->

      unless cont.includes key
        return

      cont = [
        "//- inject = '#{key} global/#{key}'"
        cont
      ].join '\n'

  cont # return