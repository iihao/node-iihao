const validate = require('../middleware/validate')
const { body } = require('express-validator')
const { User } = require('../model/index')
const md5 = require('../utils/md5')

/*用户注册验证*/
exports.register = validate([
  //配置验证规则
  body('user.username').notEmpty().withMessage('用户名不能为空'),
  body('user.password').notEmpty().withMessage('密码不能为空'),
  body('user.email')
    .notEmpty()
    .isEmail()
    .withMessage('邮箱格式错误')
    .bail() //校验通过才往下执行
    .custom(async (val) => {
      //自定义验证器
      const user = await User.findOne({ email: val })
      if (user) {
        return Promise.reject('邮箱已存在')
      }
    })
])

/*用户登录验证*/
exports.login = [
  validate([
    body('user.email')
      .notEmpty()
      .withMessage('邮箱不能为空')
      .isEmail()
      .withMessage('邮箱格式错误'),
    body('user.password').notEmpty().withMessage('密码不能为空')
  ]),
  validate([
    body('user.email').custom(async (val, { req }) => {
      const user = await User.findOne({ email: val }).select('password')
      if (!user) {
        return Promise.reject('邮箱不存在')
      }
      req.user = user
    })
  ]),
  validate([
    body('user.password').custom(async (val, { req }) => {
      if (md5(val) !== (await req.user.password)) {
        return Promise.reject('密码不正确')
      }
    })
  ])
]
