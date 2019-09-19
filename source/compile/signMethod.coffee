module.exports = (cont, path) ->

  unless ~path.search 'component'
    return cont

  unless cont
    return ''

  if ~cont.search 'methods:'
    return cont

  unless ~cont.search /\w+ = .*\-\>/
    return cont

  listResult = []

  for line in cont.split '\n'

    unless line[0]?.trim()
      continue

    if line[0] in ['#', '$', '_']
      continue

    if line[0] != line[0].toLowerCase()
      continue

    unless result = line.match /\w+ = .*\-\>/g
      continue

    [name] = result[0].split '='
    listResult.push name.trim()

  # return
  [
    cont
    "  methods: {#{listResult.join ', '}}"
  ].join '\n'