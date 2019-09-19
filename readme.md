# v-toolit

## usage

### check

```coffeescript
vt = require 'v-toolkit'
check_ = vt 'check'

await check_()
```

### compile

```coffeescript
vt = require 'v-toolkit'
compile_ = vt 'compile'

await compile_ './source/component/home/index.coffee'
```

### count

```coffeescript
vt = require 'v-toolkit'
count_ = vt 'count'

await count_()
```

### make

```coffeescript
vt = require 'v-toolkit'
make_ = vt 'make'

await make_ 'api'
```

### replace

```coffeescript
vt = require 'v-toolkit'
replace_ = vt 'replace'

await replace_ 'config', 'development'
```
