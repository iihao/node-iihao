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
    res.send('userRegistration')
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
