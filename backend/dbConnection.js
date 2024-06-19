const mongoose = require('mongoose')
const  dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URI).then(()=>{console.log("database connected")}).catch((error)=>{console.log(error)})
}
module.exports={
    dbConnection
}