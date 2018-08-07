
function fromString(src, filename) {
  let parentDirname = path.dirname(module.parent.filename)
    , dirname = parentDirname
  if (filename) {
    dirname = path.resolve(parentDirname, path.dirname(filename))
  }
  console.log(dirname, parentDirname)
  const code = deepLoad(src, dirname, parentDirname)
  return requireFromString(code)
}
