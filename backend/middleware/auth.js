const jwt = require("jsonwebtoken")
require("dotenv").config()

function Auth(req,res,next){
    const header = req.headers.authorization;
    console.log(header)
    try{
        const token = jwt.verify(header,process.env.SECRET)
    console.log(token);
    if(!token){
        return res.status(403).json({msg: "Cannot perform operation"})
    }
    req.userId = token
    next();
    }
    catch(e){
        console.log(e)
        return res.status(403).json({msg: "cannot perform operations"})
    }
}

module.exports = Auth

