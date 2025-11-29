import express from "express"
import { addAddress, getAddress } from "../controllers/addressController.js"
import authUSer from "../middlewares/authUser.js"

const addressRouter = express.Router()

addressRouter.post('/add',authUSer,addAddress)
addressRouter.get('/get',authUSer,getAddress)

export default addressRouter