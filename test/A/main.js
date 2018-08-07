const moment = require('moment')
const a = require('./a')
// const b = require('../B/b')

const requireFromPath = require('../../client/requireFromPath')
const b = requireFromPath(__dirname + '/../B/b', __dirname + '/../A')

console.log(moment === a)
console.log(moment === b)
console.log(a === b)
