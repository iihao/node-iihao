/*获取所有文章*/
exports.getArticles = async (req, res, next) => {
  try {
    res.send('getArticles')
  } catch (error) {
    next(error)
  }
}

/*获取关注的文章*/
exports.getArticlesFeed = async (req, res, next) => {
  try {
    res.send('getArticlesFeed')
  } catch (error) {
    next(error)
  }
}

/*获取某一篇文章*/
exports.getArticlesById = async (req, res, next) => {
  try {
    res.send('getArticlesById')
  } catch (error) {
    next(error)
  }
}

/*创建文章*/
exports.postArticles = async (req, res, next) => {
  try {
    res.send('postArticles')
  } catch (error) {
    next(error)
  }
}

/*更新文章*/
exports.putArticles = async (req, res, next) => {
  try {
    res.send('putArticles')
  } catch (error) {
    next(error)
  }
}

/*删除文章*/
exports.deleteArticles = async (req, res, next) => {
  try {
    res.send('deleteArticles')
  } catch (error) {
    next(error)
  }
}

/*添加评论*/
exports.addComments = async (req, res, next) => {
  try {
    res.send('addComments')
  } catch (error) {
    next(error)
  }
}

/*获取评论*/
exports.getComments = async (req, res, next) => {
  try {
    res.send('getComments')
  } catch (error) {
    next(error)
  }
}

/*删除评论*/
exports.deleteComments = async (req, res, next) => {
  try {
    res.send('deleteComments')
  } catch (error) {
    next(error)
  }
}

/*喜欢文章*/
exports.favoriteArticle = async (req, res, next) => {
  try {
    res.send('favoriteArticle')
  } catch (error) {
    next(error)
  }
}

/*取消喜欢文章*/
exports.unfavoriteArticle = async (req, res, next) => {
  try {
    res.send('unfavoriteArticle')
  } catch (error) {
    next(error)
  }
}
