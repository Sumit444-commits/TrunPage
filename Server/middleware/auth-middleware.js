import jwt from "jsonwebtoken"
import { User } from "../models/user-model.js"
const authMiddleware =async (req,res,next)=> {
    try {
        const token = req.header("Authorization")
        
        if(!token){
            res.status(401).json({message: "Unauthorized HTTP, Token not Provided"})
        }
        
        const jwtToken = token.replace("Bearer","").trim()
        
        const isVerified = jwt.verify(jwtToken,process.env.JWT_TOKEN_SECERT)
        // console.log(isVerified);
        
        const userData = await User.findOne({email : isVerified.email}).select({password:0}).
        populate({
            path:"sales",
            populate : ("service")
        });
        
        req.user = userData
        req.token = token
        req.userId = userData._id

        next()
    } catch (error) {
        next(error)
    }
}

export default authMiddleware