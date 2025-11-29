import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import 'dotenv/config'

//Register User :/api/user/regisster

export const register = async(req,res)=>{
    try{
        const {name,email,password} = req.body
        if(!name || !email || !password){
            return res.json({success:false,message:"Missing Details"})
        }
        const exisitingUser = await User.findOne({email})

        if(exisitingUser){
           return res.json({success:false,message:"User Already Exists"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({name,email,password:hashedPassword})

        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        })

        res.cookie('token',token,{
            httpOnly:true, // prevent js to access cookie
            secure:process.env.NODE_ENV === "production",// use secure cookie in production
            samesite:process.env.NODE_ENV === "production" ? 'none':'strict', // CSRF protection
            maxAge:7*20*60*60*1000, // cookie expiration time

        })

        return res.json({success:true, user:{email:user.email,name:user.name}})



    }
    catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})

    }

}

// Login User : /api/user/Login

export const login = async (req,res) =>{
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.json({success:false,message:"Email and Password are required"})
        }

        const user = await User.findOne({email})
        if(!user){
            return res.json({success:false,message:"Invalid Email or Password"})
         }
         const isMatch = await bcrypt.compare(password,user.password)
         if(!isMatch){
            return res.json({success:false,message:"Invalid Email or Password"})
         }
         const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{
            expiresIn:"7d"
        })

        res.cookie('token',token,{
            httpOnly:true, // prevent js to access cookie
            secure:process.env.NODE_ENV === "production",// use secure cookie in production
            samesite:process.env.NODE_ENV === "production" ? 'none':'strict', // CSRF protection
            maxAge:7*20*60*60*1000, // cookie expiration time

        })

        return res.json({success:true, user:{email:user.email,name:user.name,token:token}})


    }
    catch(error){
        console.log(error.message)
        res.json({success:false,message:error.message})

    }
}

//Check Auth : /api/user/is-authUSer

export const isAuth = async (req,res)=>{
    try{
        //const {userId} = req.body
        const user = await User.findById(req.userId).select("-password")
        return res.json({success:true,user})

    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:error.message})

    }
}

//logout User: /api/user/logout

export const logout = async (req,res)=>{
    try{
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            samesite:process.env.NODE_ENV === 'production' ? 'none' :'strict'
        })
        res.json({success:true,message:"Logged Out"})

    }
    catch(error){
        console.log(error.message)
        return res.json({success:false,message:error.message})

    }
}