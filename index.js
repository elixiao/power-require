const fs = require('fs')
const path = require('path')
const requireFromString = require('require-from-string')
const cache = {}

/**
 *
 * @param file: path of file
 * @param dirname: from where to find module path
 */
function fromFile(file, dirname = '.') {
  const parentDirname = path.dirname(module.parent.filename)
  file = path.resolve(parentDirname, file)
  dirname = path.resolve(parentDirname, dirname)
  if (!file.endsWith('.js')) file = file + '.js'
  if (cache[file]) return cache[file]
  const basename = path.basename(file)
    , src = fs.readFileSync(file, 'utf8')
    , folder = path.dirname(file)
    , code = deepLoad(src, folder, dirname)
    , fakedFile = path.join(dirname, basename)
    , result = requireFromString(code, fakedFile)
  cache[file] = result
  return result
}

/**
 *
 * @param src: source code as string
 * @param folder: source code folder
 * @param dirname: from where to find module path
 */
function deepLoad(src, folder, dirname = folder) {
  let lxPath = require('path')
    , regex = /require\((["'])(\.{0,2}\/.+)["']/
    , match = regex.exec(src)
  if (!match) return src
  while (match) {
    let [full, quote, relativePath] = match
      , structs = relativePath.split('/')
      , filename = structs.pop()
      , suffix = lxPath.extname(filename)
    if (['.js', '.json'].includes(suffix)) {
      structs.push(filename)
    } else {
      structs.push([filename, '.js'].join(''))
    }
    // absolute file path (handle separator on windows)
    const absoluteFile = lxPath.resolve(folder, ...structs).replace(/\\/g, '\\\\')
      , absoluteDir = lxPath.dirname(absoluteFile)
      , relativeFile = lxPath.join(dirname, relativePath)
    src = src.replace(regex, `requireFromString(deepLoad(lxFs.readFileSync('${absoluteFile}', 'utf8'),'${absoluteDir}','${relativeFile}'),'${relativeFile}'`)
    match = regex.exec(src)
  }
  const header = `
const requireFromString = require('require-from-string')
const lxFs = require('fs')
const lxPath = require('path')
${deepLoad}\n`
  return header + src
}


module.exports = {
  fromFile
}

