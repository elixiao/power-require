const moment = require('moment')
const a = require('./a')
// const b = require('../B/b')

const requireFromPath = require('../utils/requireFromPath')
const b = requireFromPath(__dirname + '/../B/b', __dirname + '/../A')

console.log(moment === a)
console.log(moment === b)
console.log(a === b)


const powerRequire = require('../../index')
const c = powerRequire.fromFile('../B/b.js')
console.log(a === c)
