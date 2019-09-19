module.exports = (cont) ->

  cont
  .replace /throw/g, 'throw new Error'
  .replace /new Error new Error/g, 'new Error'