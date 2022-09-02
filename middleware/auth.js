const jwt = require('../utils/jwt')
const jwtSecret = require('../config/config.default')
const { User } = require('../model/index')

const authToken = async (req, res, next) => {
  const token = req.headers.Authorization
  console.log(token)
  if (!token) {
    return res.status(401).end()
  }
  try {
    const resultToken = await jwt.verify(token, jwtSecret)
    console.log(resultToken)
    const user = await User.findById(resultToken.userId)
    req.user = user
    next()
  } catch (error) {
    res.status(401).json({ error })
  }
}

module.exports = authToken
