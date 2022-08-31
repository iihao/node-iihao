const express = require('express')
const profilesCtrl = require('../controller/profiles')
const router = express.Router()

/*获取信息*/
router.get('/profile/:username', profilesCtrl.getProfiles)

/*关注用户*/
router.post('profiles/:username/follow', profilesCtrl.followUser)

/*取消关注*/
router.delete('profiles/:username/follow', profilesCtrl.unfollowUser)

module.exports = router
