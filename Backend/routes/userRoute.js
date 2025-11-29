import express from "express"
import { isAuth, login, logout, register } from "../controllers/UserController.js"
import authUSer from "../middlewares/authUser.js"

const userRouter = express.Router()

userRouter.post('/register',register)
userRouter.post('/login',login)
userRouter.get('/is-auth',authUSer,isAuth)
userRouter.get('/logout',authUSer,logout)

export default userRouter