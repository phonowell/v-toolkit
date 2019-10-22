module.exports = (cont) ->

  unless cont
    return ''

  listBoolean = [
    cont.includes 'throw'
    cont.includes 'reject'
  ]

  unless listBoolean.includes true
    return cont

  listCont = cont.split '\n'
  for line, i in listCont

    if line.trim()[0] == '#'
      continue

    listBoolean = [
      line.includes 'throw '
      line.includes 'reject '
      line.endsWith 'throw'
      line.endsWith 'reject'
    ]

    unless listBoolean.includes true
      continue

    listCont[i] = line
    .replace /throw\s/g, 'throw new Error '
    .replace /reject\s/g, 'reject new Error '
    .replace /new Error new Error/g, 'new Error'

  # return
  listCont.join '\n'