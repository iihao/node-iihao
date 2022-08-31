const express = require('express')
const router = express.Router()

/*用户*/
router.use(require('./users'))

/*用户资料*/
router.use(require('./profile'))

/*文章信息*/
router.use('/articles', require('./articles'))

module.exports = router
