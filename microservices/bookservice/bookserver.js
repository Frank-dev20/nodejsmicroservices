require("dotenv").config();
const express = require("express");

//establish connection
require("...database/database");

const Book = require("/Book");

const app = express();
const port = 3000;
app.use(express.json());

//post or add books
app.post("/book", (req, res)=>{
    const newBook = new Book({...req.body});
    newBook.save().then(()=>{
        res.send("A new book has been sucessfully added")
    }).catch((err)=>{
        res.status(500).send("Internal server error");
    })
})

//get all books in the database
app.get("/books", (req, res)=>{
    Book.find().then((books)=>{
        if(book.length !==0){
            res.json(books)
        }else{
            res.status(404).send("Books not found");
        }
    }).catch((error)=>{
        res.status(500).send("Internal server error");
    });
})

//get book by its id
app.get("/book/:id", (req, res)=>{
    Book.findById(req.params.id).then((book)=>{
        if (book){
            res.json(book)
        }else{
            res.status(404).send("Book not found");
        }
    }).catch((error)=>{
        res.status(500).send("Internal server error");
    });
})

//delete book by its id
app.delete("/book/:id", (req, res)=>{
    Book.findOneAndRemove(req.params.id).then((book)=>{
        if(book){
            res.json("Book deleted successfully")
        }else{
            res.status(404).send("Book not found");
        }
    }).catch((error)=>{
        res.status(500).send("Internal server error")
    });
})

//delete a book by its title
app.delete("/book/:title", (req, res)=>{
    Book.findOneAndRemove(req.params.title).then((book)=>{
        if(book){
            res.json("Book has been deleted successfully");
        }else{
            res.status(404).send("Book not found");
        }
    }).catch((error)=>{
        res.status(500).send("Internal server error");
    });
});
app.listen(port, ()=>{
    console.log("Server is running on port ${port}")
})