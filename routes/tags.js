const express = require('express')
const tagsCtrl = require('../controller/tags')
const router = express.Router()

/*获取标签*/
router.get('/', tagsCtrl.getTags)

module.exports = router
