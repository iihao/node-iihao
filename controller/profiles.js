/*获取信息*/
exports.getProfiles = async (req, res, next) => {
  try {
    res.send('getProfilse')
  } catch (error) {
    next(error)
  }
}

/*关注用户*/
exports.followUser = async (req, res, next) => {
  try {
    res.send('followUser')
  } catch (error) {
    next(error)
  }
}

/*取消关注用户*/
exports.unfollowUser = async (req, res, next) => {
  try {
    res.send('followUser')
  } catch (error) {
    next(error)
  }
}
