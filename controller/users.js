const { User } = require('../model/index')

/*用户登录*/
exports.userLogin = async (req, res, next) => {
  try {
    res.send('userLogin')
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
    const user = new User(body.user)
    await user.save()
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
    res.send('getUser')
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
