require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const axios = require("axios");

//establish database connection

require(".../database/database");

const Request = require("./Request");

const app = express();
const port = 9000;
app.use(express.json())

app.post("/request", (req, res)=>{
    const newRequest = new Request({
        customerID: mongoose.Types.ObjectId(req.body.customerID),
        bookID: mongoose.Types.ObjectId(req.body.bookID),
        requestDate: req.body.requestDate,
        deliveryDate: req.body.deliveryDate
    });
    newRequest.save().then(()=>{
        res.send("New book request has been made")
    }).catch((error)=>{
        res.status(500).send("Internal server error");
    })
})

app.get("/request", (req, res)=>{
    Request.find().then((request)=>{
        if(request){
            res.json(request)
        }else{
            res.status(404).send("Request not found");
        }
    }).catch((error)=>{
        res.status(500).send("Internal server error");
    });
})

app.get("/request/:id", (req, res)=>{
    Request.findById(req.params.id).then((request)=>{
        if(request){
            axios.get("http://localhost:5000/customer/${request.customerID}").then((response)=>{
                let requestObject = {
                    CustomerName = response.data.name,
                    BookTitle: ""
                }
                axios.get("http://localhost:3000/book/${request.bookID}").then((response)=>{
                    requestObject.BookTitle = response.data.title
                    res.json(requestObject);
                })
            })
        }else{
            res.status(404).send("Request not found");
        }
    }).catch((error)=>{
        res.status(500).send("Internal server error");
    });
})

app.listen(port, ()=>{
    console.log("Server is running on port ${port}");
})