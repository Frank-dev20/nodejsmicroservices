const mongoose = require('mongoose');
const book = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: String
    },
    publisher:{
        type: String,
        require: true
    },
    isbn:{
        type: Number,
        require: true
    }

})

const Book = mongoose.model("Book", book);
module.exports = Book;