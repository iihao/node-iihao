const express = require('express')
const userCtrl = require('../controller/users') //用户逻辑控制
const useValidator = require('../validator/user') //用户数据验证
const authToken = require('../middleware/auth')
const router = express.Router()

/* 登录 */
router.post('/users/login', useValidator.login, userCtrl.userLogin)

/*注册*/
router.post('/users', useValidator.register, userCtrl.userRegistration)

/*获取用户*/
router.get('/user', authToken, userCtrl.getUser)

/*修改用户*/
router.put('/user', authToken, userCtrl.putUser)

module.exports = router
