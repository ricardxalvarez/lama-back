import OrdersDAO from "../DAO/orders.dao.js";

export default class OrderController {
    static async apiPostOrder(req,res){
        try {
            const userid = req.body.userid
            const cart = req.body.cart
            const email = req.body.email
            const address = req.body.address
            const status = req.body.status
            const total = req.body.total
            
            await OrdersDAO.postOrderDao(userid, cart, status, total, email, address)

            res.status(200).send({status: 'ok'})
        } catch (error) {
            console.error(`Unable to post in controller ${error}`)
        }
    }
    static async apiGetOrder(req, res){
        try {
            const userid = req.query.userid

            const order = await OrdersDAO.searchOrderDao(userid)

            res.json({order})
        } catch (error) {
            
        }
    }
}