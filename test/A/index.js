const mongoose = require('mongoose')
const powerRequire = require('../../index')
const log = console.log
mongoose.connect('mongodb://127.0.0.1:27017/test', {useNewUrlParser: true})

const LatentModel = powerRequire.fromFile('../B/latent.model.js')
LatentModel.findOne().then(it => log('latent', it))
