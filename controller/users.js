const { User } = require('../model/index')
const jwt = require('../utils/jwt')
const { jwtSecret } = require('../config/config.default')
const md5 = require('../utils/md5')

/*用户登录*/
exports.userLogin = async (req, res, next) => {
  try {
    const user = req.user.toJSON()

    //jwt Token
    const token = await jwt.sign({ userId: user._id }, jwtSecret)

    //删除密码显示
    delete user.password

    res.status(200).json({
      ...user,
      token
    })
  } catch (error) {
    next(error)
  }
}

/*用户注册*/
exports.userRegistration = async (req, res, next) => {
  try {
    //1、获取请求体
    const body = req.body
    //2、数据验证
    //3、数据保存到数据库
    let user = new User(body.user)
    await user.save()

    user = user.toJSON()
    delete user.password //去除返回密码

    //4、前端发送成功响应
    res.status(201).json({
      user
    })
  } catch (error) {
    next(error)
  }
}

/*获取用户*/
exports.getUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user
    })
  } catch (error) {
    next(error)
  }
}

/*修改用户*/
exports.putUser = async (req, res, next) => {
  try {
    res.send('putUser')
  } catch (error) {
    next(error)
  }
}
