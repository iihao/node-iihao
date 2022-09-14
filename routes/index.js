const express = require('express')
const router = express.Router()

/*首页*/
router.get('/', (req, res, next) => {
  console.log(req.query)
  res.render('index', { title: 'Express' })
})

/*用户*/
router.use(require('./users'))

/*用户资料*/
router.use(require('./profile'))

/*文章信息*/
router.use('/articles', require('./articles'))

module.exports = router
