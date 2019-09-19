$ = require 'fire-keeper'

module.exports = (cont, path) ->

  unless ~path.search 'component'
    return cont

  unless ~path.search 'index.'
    return cont

  unless cont
    return ''

  basename = $.getBasename $.getDirname path

  # return
  cont.replace /(#[\w-]+)/g, (string) ->

    if (parseInt string[1...], 16) >= 0
      return string

    "#{string}-#{basename}"