const crypto = require('crypto')

/*定义md5加密*/
const md5 = (val) => {
  return crypto.createHash('md5').update(String(val)).digest('hex')
}
module.exports = md5
