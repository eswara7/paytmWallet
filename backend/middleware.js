const jwt = require("jsonwebtoken")
const authMiddleware =(req,res,next)=>{

    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        return res.status(401).json({messege:"no token provided"})
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        
        if(decoded.userId){
            req.userId = decoded.userId; //req.userId make sure to pass userId to next
            next()}
        else{
            res.status(403).json({})
        }
    } catch (error) {
        res.status(403).json({messege:"access denied/invalid token"})
    }
}

module.exports = {
    authMiddleware
}