import UsersDao from "../DAO/users.dao.js";

export default class UserController {
    static async apiSubmitUser(req,res,next){
        const name = req.body.name
        const lastname = req.body.lastname
        const email = req.body.email
        const user = req.body.username
        const password = req.body.password
        const cartlist = req.body.cartlist
        const wishlist = req.body.wishlist

        await UsersDao.submitUser(
            name,
            lastname,
            user,
            email,
            password,
            cartlist,
            wishlist
        )
        res.json({status : 'ok'})
    }
    static async getUser(req,res, next){
        const user = req.query.username
        const password = req.query.password

        let item = await UsersDao.logUser(user, password)

        res.json({item})
    }
    static async getItemById(req, res, next){
     try {
         let id = req.params.id || {}
         let item = await UsersDao.getUserbyID(id)
         if (!item) {
                res.status(404).json({ error: 'not found'})
            }
        res.json(item)
     } catch (error) {
         console.log(`there was an error getting this user ${error}`)
     }   
    }
}