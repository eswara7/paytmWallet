const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true,
        minlength:4,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    }
})
const User = mongoose.model('User',userSchema)
const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    balance:{
        type:Number,
        required:true
    }

})

const Account = mongoose.model("Account",accountSchema)

module.exports = {
    User,
    Account
}