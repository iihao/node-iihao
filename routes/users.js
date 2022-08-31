var express = require('express')
var router = express.Router()

/* 登录 */
router.post('/users/login', (req, res, next) => {
  try {
    res.send('post /users/login success')
  } catch (error) {
    next(error)
  }
})

/*注册*/
router.post('/users', (req, res, next) => {
  try {
    res.send('post /user success')
  } catch (error) {
    next(error)
  }
})

/*获取用户*/
router.get('/user', (req, res, next) => {
  try {
    res.send('get /user success')
  } catch (error) {
    next(error)
  }
})

/*修改用户*/
router.put('user', (req, res, next) => {
  try {
    res.send('put /user success')
  } catch (error) {
    next(error)
  }
})

module.exports = router
