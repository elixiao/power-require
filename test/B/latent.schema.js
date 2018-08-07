const mongoose = require('mongoose')
const LatentSchema = mongoose.Schema
const ObjectId = LatentSchema.Types.ObjectId

module.exports = new LatentSchema({
  name: {type: String},  //姓名
  email: {type: String},  //邮箱
}, {timestamps: true})

