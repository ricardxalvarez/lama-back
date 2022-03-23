import {ObjectId, ObjectID} from 'mongodb'

let cart

export default class CartDao {
    static async injectDB(conn){
        try {
            cart = await conn.db(process.env.LAMA_NS).collection('cart')
        } catch (error) {
            console.error(`Couldn't connect to server ${error}`)
        }
    }
    static async addCart(list, userid){
        try {
            const cartDoc = {
                list,
                userid : ObjectID(userid)
            }
            return await cart.insertOne(cartDoc)
        } catch (error) {
            console.error(`Unable to add cart ${error}`)
        }
    }
    static updateCart(list, userid){
        try {
            const update = cart.updateOne(
                { userid: ObjectId(userid) },
                {$set : {list: list}}
                )
            return update    
        } catch (error) {
            
        }
    }
}