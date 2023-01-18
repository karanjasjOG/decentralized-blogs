const express = require('express');
const app = express();
const mongoose = require('mongoose');
const router = require('./router/router.js')
// const usersRouter = require('./router/users')
// const articleRouter = require('./router/articles')
const methodOverride = require('method-override')
const https = require('https');
const cookieParser = require('cookie-parser')

mongoose.connect('mongodb://127.0.0.1/blog');
mongoose.set('strictQuery', true);

app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))
app.use(cookieParser())




app.use('/articles/', router, (req, res) => {
    res.sendStatus(401)

});


app.listen(3000);

