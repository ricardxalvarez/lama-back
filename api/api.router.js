import express from 'express'
import ProductsCtrl from './products.controller.js'
import Password from './password.controller.js'
import UserController from './user.controller.js'
import CartController from './cart.controller.js'
const router = express.Router()

router.route('/').get(ProductsCtrl.getApiProducts).post(ProductsCtrl.postApiProducts).delete(ProductsCtrl.apiDeleteProduct).put(ProductsCtrl.apiUpdateProduct)
router.route('/password').get(Password.getPassword)
router.route('/all').get(ProductsCtrl.getAllProducts)
router.route('/item').get(ProductsCtrl.getItemById)
router.route('/user').post(UserController.apiSubmitUser).get(UserController.getUser)
router.route('/user/add').post(CartController.apiAddItem).put(CartController.apiUpdateItem)
router.route('/user/details/:id').get(UserController.getItemById)
export default router