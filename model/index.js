const mongoose = require('mongoose')
const { dbUrl } = require('../config/config.default')
const userSchema = require('./user')

mongoose.connect(dbUrl)

const db = mongoose.connection

//当DB连接失败时
db.on('error', (err) => {
  console.log('MongoDb连接失败', err)
})

//当DB连接成功时
db.once('open', () => {
  console.log('MongoDB连接成功')
})

//组织导出数据模型
module.exports = {
  User: mongoose.model('User', userSchema)
}
