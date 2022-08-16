import mongoose from "mongoose";



//create a model to represent request in the database
const requestSchema = mongoose.Schema({
    customerID:{
        type: SchemaType.ObjectId,
        require:true
    },

    bookID:{
        type: SchemaType.ObjectId,
        require: true
    },

    requestDate:{
        type: Date,
        require: true
    },

    deliveryDate:{
        type: Date,
        require: true
    }
})

const Request = model("Request", requestSchema);

export default Request;