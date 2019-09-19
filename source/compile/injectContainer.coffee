module.exports = (cont) ->

  [
    '.page'
    ("  #{line}" for line in cont.split '\n')...
  ].join '\n'