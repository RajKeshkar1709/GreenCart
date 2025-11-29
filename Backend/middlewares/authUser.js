import jwt from "jsonwebtoken"
const authUSer = async (req,res,next)=>{
    const {token} = req.cookies
    if(!token){
        return res.json({success:false,message:"Not Authorized"})

    }
    try{
        const tokenDeCode = jwt.verify(token, process.env.JWT_SECRET)
        if(tokenDeCode.id){
            req.userId = tokenDeCode.id
        }
        else{
            return res.json({success:false,message:"Not Authorized"})


        }
        next()

    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:error.message})

    }

}

export default authUSer