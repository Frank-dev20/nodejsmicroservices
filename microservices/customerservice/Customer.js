import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
    firstName: {
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },

    age: {
        type: Number,
        require: false
    },

    phoneNumber:{
        type: Number,
        require: true
    },

})
const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;