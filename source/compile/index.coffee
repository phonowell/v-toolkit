_ = require 'lodash'
$ = require 'fire-keeper'

pug = require 'pug'
coffee = require 'coffeescript'

# function

class M

  constructor: (@name = 'default') ->

    # inject
    for key in @feature
      do (key) =>

        path = require 'path'
        @fn[key] = require path.resolve __dirname, key

        @[key] = (arg...) =>

          unless @enabled[key]
            return arg[0]

          @fn[key] arg...

    # feature
    for key in @setFeature @name
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
  setFeature(key)
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
    'replaceError'
    'replaceExport'
    'replaceNamespace'
    'signComponent'
    'signEnter'
    'signLeave'
    'signMethod'
  ]
  fn: {}

  # ---

  compileCoffee_: (path, option = {}) ->

    contCoffee = await $.read_ path
    contCoffee = _.trim contCoffee or ''

    contCoffee = @signEnter contCoffee, path, @name
    contCoffee = @signLeave contCoffee, path, @name
    contCoffee = @signMethod contCoffee, path
    contCoffee = @injectLodash contCoffee
    contCoffee = @injectFn contCoffee
    contCoffee = @injectComponent contCoffee, option.component
    contCoffee = @replaceError contCoffee
    contCoffee = @replaceExport contCoffee

    # return
    coffee.compile contCoffee

  compilePug_: (path) ->

    contPug = await $.read_ path
    contPug = _.trim contPug or ''

    contPug = @injectContainer contPug, path, @name
    contPug = @injectComponentGlobal contPug
    contPug = @replaceNamespace contPug, path
    contPug = @signComponent contPug

    contHtml = new String (pug.compile contPug)()
    contHtml.component = contPug.component
    contHtml # return

  compileStyl_: (path) ->

    contStyl = await $.read_ path
    contStyl = _.trim contStyl or ''

    contStyl = @replaceNamespace contStyl, path
    contStyl = @injectBasic contStyl

    contStyl = new String contStyl
    contStyl.isScoped = !(contStyl.search /\s*\/{2}\s*@scope/)

    contStyl # return

  compile_: (path) ->

    # check type of path
    type = $.type path
    unless type == 'string'
      throw new Error "compiler/error: invalid type of path: '#{type}'"

    # check path
    unless await $.isExisted_ path
      throw new Error "compiler/error: invalid path: '#{path}'"

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

  setFeature: (name) ->

    listDisabled = switch name
      
      when 'default' then [
        'injectComponentGlobal'
        'injectContainer'
        'replaceNamespace'
      ]

      when 'mp' then [
        'replaceNamespace'
      ]

      when 'spa' then [
        'injectComponentGlobal'
      ]

      else throw new Error "compile/error: invalid name '#{name}'"

    listFeature = [@feature...]
    _.remove listFeature, (n) -> n in listDisabled
    listFeature # return

# return
module.exports = (arg...) ->
  m = new M arg...
  
  fn_ = m.compile_.bind m
  fn_.coffee_ = m.compileCoffee_.bind m
  
  fn_ # return