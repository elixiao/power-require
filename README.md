# super-require

```js
const superRequire = require('super-require')
const a = superRequire.fromFile('path/to/file','whatever/node/module/path/you/want')
```


## API

### fromFile(file, [folder])

#### file

*Required*  
Type: `string`

where file is located, either absolute or relative path is supported.

#### folder
Type: `string`  
Default: `.`

from where to find module path, default is the path of the requiring parent file
