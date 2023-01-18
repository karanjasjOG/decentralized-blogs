router = require('express').Router();

const Users = require('./../models/users.js')

async function verifyUser(req, res) {

    let user = await Users.findOne({ username: req.body.username })
    if (user != null && user.email === req.body.email && user.password === req.body.password) {

        res.cookie('username', user.username, { maxAge: 1000 * 600, httpOnly: true })
        res.cookie('email', user.email, { maxAge: 1000 * 600, httpOnly: true })
        res.cookie('password', user.password, { maxAge: 1000 * 600, httpOnly: true })

        return true;

    }
    else {
        return false

    }

}

async function verifyUserCookie(req) {

    let user = await Users.findOne({ username: req.cookies.username })

    if (user != null && user.email === req.cookies.email && user.password === req.cookies.password)
        return true;
    else
        return false
}
router.get('/sign-up', async (req, res) => {
    res.render('login/sign-up.ejs')
})

router.post('/sign-up', async (req, res) => {
    await new Users({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    }).save()
    res.redirect('/articles/login/')
})

router.get('/login', async (req, res) => {
    console.log('worked')
    let verify = await verifyUserCookie(req)

    if (verify) res.redirect('/articles/basic')
    else res.render('login/login.ejs')
})

router.post('/login', async (req, res) => {
    verify = await verifyUser(req, res)
    if (verify) res.redirect('/articles/basic')
    else res.redirect('/articles/login')
})

module.exports = router;
