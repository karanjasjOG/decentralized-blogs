const express = require('express');
const app = express();
const mongoose = require('mongoose');
const articleRouter = require('./router/articles.js')
const methodOverride = require('method-override')

mongoose.connect('mongodb://127.0.0.1/blog');
mongoose.set('strictQuery', true);

app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'))


app.use('/articles/', articleRouter, (req, res) => {
    res.sendStatus(401)
});


app.listen(3000);

// console.log([].length)