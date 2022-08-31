const express = require('express')
const router = express.Router()

/*获取 profile*/
router.get('/profile/:username', (req, res, next) => {
  try {
    res.send('get /profile/:username success')
  } catch (error) {
    next(error)
  }
})

/*关注用户*/
router.post('profiles/:username/follow', (req, res, next) => {
  try {
    res.send('post profiles/:username/follow success')
  } catch (error) {
    next(error)
  }
})

/*取消关注*/
router.delete('profiles/:username/follow', (req, res, next) => {
  try {
    res.send('profiles/:username/follow')
  } catch (error) {
    next(error)
  }
})

module.exports = router
