_ = require 'lodash'
$ = require 'fire-keeper'
path = require 'path'

pug = require 'pug'
coffee = require 'coffeescript'

# function

class M

  constructor: (set = 'default') ->

    # inject
    for key in @feature
      do (key) =>

        @fn[key] = require path.resolve __dirname, key

        @[key] = (arg...) =>

          unless @enabled[key]
            return arg[0]

          @fn[key] arg...

    # default
    # enable all
    if set == 'default'
      for key in @feature
        @enabled[key] = true

    @ # return

  ###
  enabled
  feature
  fn
  ---
  compileCoffee_(path, option)
  compilePug_(path)
  compileStyl_(path)
  compile_(path)
  ###

  enabled: {}
  feature: [
    'injectBasic'
    'injectComponent'
    'injectComponentGlobal'
    'injectContainer'
    'injectFn'
    'injectLodash'
    'makeVariable'
    'replaceThrow'
    'signComponent'
    'signMethod'
  ]
  fn: {}

  # ---

  compileCoffee_: (path, option = {}) ->

    contCoffee = await $.read_ path
    contCoffee = _.trim contCoffee or ''

    contCoffee = @signMethod contCoffee, path
    contCoffee = @injectLodash contCoffee
    contCoffee = @injectFn contCoffee
    contCoffee = @injectComponent contCoffee, option.component
    contCoffee = @replaceThrow contCoffee

    # return
    coffee.compile contCoffee

  compilePug_: (path) ->

    contPug = await $.read_ path
    contPug = _.trim contPug or ''

    if ~path.search 'index.pug'
      contPug = @injectContainer contPug
    contPug = @injectComponentGlobal contPug
    contPug = @signComponent contPug

    contHtml = new String (pug.compile contPug)()
    contHtml.component = contPug.component
    contHtml # return

  compileStyl_: (path) ->

    contStyl = await $.read_ path
    contStyl = _.trim contStyl or ''

    contStyl = @injectBasic contStyl

    contStyl = new String contStyl
    contStyl.isScoped = !(contStyl.search /\s*\/{2}\s*@scope/)

    contStyl # return

  compile_: (path) ->

    # check type of path
    type = $.type path
    unless type == 'string'
      throw new Error "compiler/error: invalid type of path: '#{type}'"

    # variable
    {basename, pathSource, pathTarget} = @makeVariable path

    $.info().pause()

    contJson = await $.read_ "#{pathSource}/#{basename}.yaml"
    contHtml = await @compilePug_ "#{pathSource}/#{basename}.pug"
    contStyl = await @compileStyl_ "#{pathSource}/#{basename}.styl"
    contJs = await @compileCoffee_ "#{pathSource}/#{basename}.coffee",
      component: contHtml.component

    contResult = []

    if _.size contJson
      contResult = [
        contResult...
        '<config>'
        $.parseString contJson
        '</config>'
      ]

    if contHtml.length
      contResult = [
        contResult...
        '<template>'
        contHtml
        '</template>'
      ]

    if contStyl.length
      contResult = [
        contResult...
        (
          if contStyl.isScoped
            '<style lang="stylus" scoped>'
          else '<style lang="stylus">'
        )
        contStyl
        '</style>'
      ]

    if contJs.length
      contResult = [
        contResult...
        '<script>'
        contJs
        '</script>'
      ]

    await $.write_ pathTarget, contResult.join '\n'

    $.info().resume()
    $.info "made '#{pathTarget}'"

    @ # return

# return
module.exports = (arg...) ->
  m = new M arg...
  
  fn_ = m.compile_.bind m
  fn_.coffee_ = m.compileCoffee_.bind m
  
  fn_ # return