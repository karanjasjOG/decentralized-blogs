router = require('express')();
const Article = require('./../models/article.js');
router.get('/basic/', async (req, res) => {

    const articles = await Article.find().sort({ createdAt: 'desc' });


    // console.log(articles);

    res.render('articles/index.ejs', { articles: articles });
})


router.get('/new/', async (req, res) => {

    res.render('articles/new.ejs', { article: new Article() });
})
router.get('/:slug', async (req, res) => {
    // console.log(5)
    const article = await Article.findOne({ slug: req.params.slug })
    if (article == null) res.redirect('/')

    res.render('articles/show.ejs', { article: article })
})
router.get('/', (req, res) => {
    res.redirect('/articles/basic')
})

router.post('/', async (req, res) => {

    let article = new Article({
        title: req.body.title,
        description: req.body.description,
        markdown: req.body.markdown,
    })
    // console.log(1)
    try {
        console.log(2)
        article = await article.save();
        console.log(7)
        res.redirect(`/articles/${article.slug}`)

    } catch (e) {
        console.log(3)
        console.log(e)
        res.render('articles/new.ejs', { article: article })
    }
    // console.log(4)
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
