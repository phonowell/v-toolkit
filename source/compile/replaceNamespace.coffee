$ = require 'fire-keeper'

module.exports = (cont, path) ->

  unless path.includes 'component'
    return cont

  unless path.includes 'index.'
    return cont

  unless cont
    return ''

  basename = $.getBasename $.getDirname path

  # return
  cont.replace /(#[\w-]+)/g, (string) ->

    unless string[1...].replace /[0123456789abcdef]/g, ''
      return string

    "#{string}-#{basename}"