const { authMiddleware } = require("../middleware");
const { User } = require("../db");
const { signUpBodyZodSchema, signInBodyZodSchema, updateBodyZodSchema } = require("../zodValidatoin");
require("dotenv").config()
const jwt = require("jsonwebtoken");
const becrypt = require("bcrypt");
const saltRounds = 10;

/* //GET ALL USERS
const getUsers = async (req,res,next)=>{
    let users;
    try {
        users = await User.find()
    } catch (error) {
        return res.status(400).json({messege:"empty"})
    }
    res.status(200).json({users})
} */


//USER SIGNUP
const signUp = async (req,res,next)=>{
    const {success} = signUpBodyZodSchema.safeParse(req.body)
  
    if(!success){
        return res.status(411).json({messege:"incorrect inputs"})
    }
    const isUserExist = await User.findOne({
        username:req.body.username
    })
    if(isUserExist){
        return res.status(411).json({messege:"user already exist please login"})
    }

    const hashedPassword = becrypt.hashSync(req.body.password,saltRounds)
   await User.create({
        username:req.body.username,
        password:hashedPassword,
        firstName:req.body.firstName,
        lastName:req.body.lastName
    })

    const userId = User._id;
    const token = jwt.sign({userId},process.env.JWT_SECRET);
    

    res.status(200).json({messege:"user created",token:token})
}




//SIGN IN
const signIn = async (req,res,next)=>{
    const {success} = signInBodyZodSchema.safeParse(req.body)
    if(success.false){
        return res.status(411).json({messege:"wrong credentials"})
    }
    let isUserExist;
    try {
        isUserExist = await User.find({
            username:req.body.username
        })
    } catch (error) {
        return res.status(411).json(error)
    }
    const password = req.body.password;
    const isPasswordCorrect = becrypt.compareSync(password,isUserExist.password);

    if(isPasswordCorrect){
        const user = await User.findOne({
            username:req.body.username,
            password:req.body.password
        })
        if(user){
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET)
            res.json({token:token})
            return;
        } 
        return res.status(411).json({messege:"error while logging in"})
    }

}


//UPDATE USER
const updateUser = async (req,res,next)=>{
    const {success} = updateBodyZodSchema.safeParse(req.body)
    if(!success){
        res.status(411).json({messege:"enter vaild details"})
    }
    await User.updateOne({
        _id:req.userId
    },req.body)
    res.status(200).json({messege:"updated successfully"})
}

//get BULK users

const getBulk = async(authMiddleware,req,res)=>{
    //  LIKE IN SQL 
    const filter = req.query.filter || "";
    const users = await User.find({
        $or:[{
            firstName:{
                "$regex":filter
            },
            lastName:{
                "$regex":filter
            }
        }]
    })
    res.json({
        user: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
}
module.exports = {
    signUp,
    signIn,
    updateUser,
    getBulk
}