import express from 'express'
import authUSer from '../middlewares/authUser.js'
import { getAllOrders, getUserOrders, placeOrderCOD, placeOrderStripe } from '../controllers/orderController.js'
import authSeller from '../middlewares/authSeller.js'

const orderRouter = express.Router()

orderRouter.post('/cod',authUSer,placeOrderCOD)
orderRouter.post('/stripe',authUSer,placeOrderStripe)
orderRouter.get('/user',authUSer,getUserOrders)
orderRouter.get('/seller',authSeller,getAllOrders)

export default orderRouter