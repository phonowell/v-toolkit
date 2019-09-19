$ = require 'fire-keeper'
path = require 'path'

module.exports = (key, arg...) ->
  m = require path.resolve __dirname, "dist/#{key}/index"
  m arg...