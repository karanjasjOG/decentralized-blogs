router = require('express').Router();

const Article = require('./../models/article.js');




router.get('/edit/:id', async (req, res) => {
    const article = await Article.findById(req.params.id)

    res.render('articles/edit.ejs', { article: article })
})

router.post('/edit/:id', async (req, res) => {

    try {
        let editArticle = await Article.findById(req.params.id);
        editArticle.title = req.body.title
        editArticle.description = req.body.description
        editArticle.markdown = req.body.markdown
        await editArticle.save()
        res.redirect(`/articles/${editArticle.slug}`)

    } catch (e) {
        console.log(e)
        res.render('articles/edit.ejs', { article: editArticle })
    }
})

router.get('/basic/', async (req, res) => {

    // let user = await Users.findOne({ username: req.cookies.username })

    const articles = await Article.find().sort({ createdAt: 'desc' });




    res.render('articles/index.ejs', { articles: articles });
})


router.get('/new/', async (req, res) => {

    res.render('articles/new.ejs', { article: new Article() });
})
router.get('/:slug', async (req, res) => {

    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')

    res.render('articles/show.ejs', { article: article })
})
router.get('/', (req, res) => {
    console.log('over heere')
    res.redirect('/articles/users/sign-up')
})

router.post('/', async (req, res) => {

    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })

    try {

        article = await article.save();

        res.redirect(`/articles/${article.slug}`)

    } catch (e) {

        res.render('articles/new.ejs', { article: article })
    }

})



router.delete('/:id', async (req, res) => {
    // console.log('hgh')
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/articles')
})

router.post('/test', (req, res) => {
    res.redirect('/articles')
})



module.exports = router;
