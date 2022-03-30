import express from 'express'
import ProductsCtrl from './products.controller.js'
import Password from './password.controller.js'
import UserController from './user.controller.js'
import CartController from './cart.controller.js'
import OrderController from './order.controller.js'
import stripe from 'stripe'
const router = express.Router()

router.route('/').get(ProductsCtrl.getApiProducts).post(ProductsCtrl.postApiProducts).delete(ProductsCtrl.apiDeleteProduct).put(ProductsCtrl.apiUpdateProduct)
router.route('/password').get(Password.getPassword)
router.route('/all').get(ProductsCtrl.getAllProducts)
router.route('/item').get(ProductsCtrl.getItemById)
router.route('/user').post(UserController.apiSubmitUser).get(UserController.getUser)
router.route('/user/add').post(CartController.apiAddItem).put(CartController.apiUpdateItem).delete(CartController.apiDeleteItem)
router.route('/user/details/:id').get(UserController.getItemById)
router.route('/order').post(OrderController.apiPostOrder).get(OrderController.apiGetOrder)
router.route('/payment').post(async (req, res)=>{
    await stripe(process.env.STRIPE_SECRET_KEY).paymentIntents.create({
        source: req.body.tokenId,
        amount: req.body.amount * 100,
        currency: 'usd'
    }, (stripeErr, stripeRes)=>{
        if( stripeErr){
            res.status(500).json(stripeErr)
        } else {
            res.status(200).json(stripeRes)
        }
    })
})
export default router