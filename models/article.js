const mongoose = require('mongoose');
const marked = require('marked');
const slugify = require('slugify');
const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);
const { NodeHtmlMarkdown, NodeHtmlMarkdownOptions } = require('node-html-markdown')
const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    markdown: {
        type: String,
        required: true
    },
    sanitizedMarkdown: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    slug: {
        type: String,
        required: true,
        unique: true
    }
});


articleSchema.pre('validate', function (next) {

    if (this.title) {

        this.slug = slugify(this.title, { lower: true, strict: true })
    }
    if (this.markdown) {
        console.log('maskl')
        this.sanitizedMarkdown = DOMPurify.sanitize(marked.parse(this.markdown))
        this.markdown = NodeHtmlMarkdown.translate(this.sanitizedMarkdown)


    }

    next()
});

// articleSchema.pre('updateOne', function (next) {


//     console.log('maskl')
//     if (this.markdown) {
//         console.log('maskl')
//         this.sanitizedMarkdown = DOMPurify.sanitize(marked.parse(this.markdown))
//         this.markdown = NodeHtmlMarkdown.translate(this.sanitizedMarkdown)


//     }

//     next()
// });


module.exports = mongoose.model('Article', articleSchema);