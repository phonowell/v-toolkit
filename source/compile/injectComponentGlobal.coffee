module.exports = (cont) ->

  for key in ['router-link', 'thumb']
    do (key) ->

      unless ~cont.search key
        return

      cont = [
        "//- inject = '#{key} global/#{key}'"
        cont
      ].join '\n'

  cont # return