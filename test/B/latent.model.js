const mongoose = require('mongoose')
const LatentSchema = require('./latent.schema')
const Model = mongoose.model('latent', LatentSchema)
module.exports = Model

