import {ObjectId} from 'mongodb'

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
                userid : ObjectId(userid)
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
    static async deleteCart(cartid){
        try {
            const deleteResponse = cart.deleteOne({
                userid: ObjectId(cartid)
            })
            return deleteResponse
        } catch (error) {
            console.error(`Unable to delete cart ${error}`)
        }
    }
}