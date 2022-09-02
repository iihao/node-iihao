const express = require('express')
const userCtrl = require('../controller/users')
const useValidator = require('../validator/user')
const router = express.Router()

/* 登录 */
router.post('/users/login', useValidator.login, userCtrl.userLogin)

/*注册*/
router.post('/users', useValidator.register, userCtrl.userRegistration)

/*获取用户*/
router.get('/user', userCtrl.getUser)

/*修改用户*/
router.put('user', userCtrl.putUser)

module.exports = router
