require("dotenv").config();

const express = require("express");

require(".../database/database");

const Customer = require("./Customer");

const app = express();

const port = 5000;
app.use(express.json())



app.post("/customer", (req, res)=>{
 const newCustomer = new Customer({...req.body});
 newCustomer.save().then(()=>{
     res.send("A new customer has been created");
 }).catch((error)=>{
     res.status(500).send("Internal server error");
 })
})

app.get("/customers", (req, res)=>{
    Customer.find().then((cutomers)=>{
        if(customers){
            res.json(customers)
        }else{
            res.status(404).send('Customers cannot be found');
        }
    }).catch((error)=>{
        res.status(500).send("Iternal server error");
    })
})

app.get("/customer/:id", (req,res)=>{
    Customer.findById(req.params.id).then((customer)=>{
        if(customer){
            res.json(customer)
        }else{
            res.status(404).send("customer not found");
        }
    }).catch((error)=>{
            res.status(500).send("internal server error");
    });
})

app.get("/customer/:name", (req, res)=>{
    Customer.findOne(req.params.name).then((customer)=>{
        if(customer){
            res.json(customer)
        }else{
            res.status(404).send("customer cannot be found");
        }
    }).catch((error)=>{
        res.status(500).send("Internal server error occurred");
    });
})

app.delete("/customer/:id", (req,res)=>{
    Customer.findByIdAndRemove(req.params.id).then((customer)=>{
        if(customer){
            res.json("customer has been deleted")
        }else{
            res.status(404).send("Customer with id ${id} is not found");
        }
    }).catch((error)=>{
        res.status(500).send("internal server error");
    });
});

app.listen(port, ()=>{
    console.log("Server is running on port")
})