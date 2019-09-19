$ = require 'fire-keeper'

# return
module.exports = ->

  # clean
  if $.os == 'macos'
    await $.remove_ './**/.DS_Store'

  # exec
  await $.exec_ [
    'nrm use npm'
    'npm publish'
    'nrm use taobao'
  ]