const express = require('express')
const articlesCtrl = require('../controller/articles')
const authToken = require('../middleware/auth')
const useValidate = require('../validator/article')
const router = express.Router()

/*获取文章*/
router.get('/', articlesCtrl.getArticles)

/*获取关注用户文章*/
router.get('/feed', articlesCtrl.getArticlesFeed)

/*获取单篇文章*/
router.get('/:slug', articlesCtrl.getArticlesById)

/*创建文章*/
router.post(
  '/',
  authToken,
  useValidate.createArticle,
  articlesCtrl.postArticles
)

/*更新文章*/
router.put('/:slug', articlesCtrl.putArticles)

/*删除文章*/
router.delete('/:slug', articlesCtrl.deleteArticles)

/*给文章添加评论*/
router.post('/:slug/comments', articlesCtrl.addComments)

/*获取文章评论*/
router.get('/:slug/comments', articlesCtrl.getComments)

/*删除评论*/
router.delete('/:slug/comments/:id', articlesCtrl.deleteComments)

/*喜欢文章*/
router.post('/:slug/favorite', articlesCtrl.favoriteArticle)

/*取消喜欢文章*/
router.delete('/:slug/favorite', articlesCtrl.unfavoriteArticle)

module.exports = router
