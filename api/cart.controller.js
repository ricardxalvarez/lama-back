import CartDao from "../DAO/cart.dao.js";

export default class CartController {
    static async apiAddItem(req,res, next){
        const list = req.body.list
        const userid = req.body.userid

        await CartDao.addCart(list, userid)

        res.json({success: 'ok'})
    }
    static async apiUpdateItem(req, res,next){
        try {
            const list = req.body.list
            const userid = req.body.userid
    
            await CartDao.updateCart( list, userid)
    
            res.json({status: 'ok'})
        } catch (error) {
            console.error(`Unable to update controller ${error}`)
        }
    }
}