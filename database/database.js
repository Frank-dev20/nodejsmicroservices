const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    console.log("Database connection is established");
}).catch((e)=>{
    console.log("Database connection failed");
})