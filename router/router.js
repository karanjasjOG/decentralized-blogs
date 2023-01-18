router = require('express').Router()
articleRouter = require('./articles')
usersRouter = require('./users')




router.use(articleRouter)
router.use(usersRouter)

module.exports = router;