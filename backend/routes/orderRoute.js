import express from 'express';
import {placeOrder,placeOrdersRazorpay,verifyStripe,placeOrdersStripe,allOrders,updateStatus,userOrders, verifyRazorpay} from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/authUser.js';
const orderRouter = express.Router();

//admin features
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

// payment features
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrdersStripe);
orderRouter.post('/razorpay',authUser,placeOrdersRazorpay);

// user feature
orderRouter.post('/userorders',authUser,userOrders);

//verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)


export default orderRouter;