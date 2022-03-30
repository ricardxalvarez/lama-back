let order
import { ObjectId } from "mongodb";

export default class OrdersDAO {
    static async injectDB(conn){
        if (order){
            return
        } else {
            try {
                order = conn.db(process.env.LAMA_NS).collection('orders')
            } catch (error) {
                console.error(`Unable to connect to collection ${error}`)
            }
        }
    } 
    static async postOrderDao(userid, cart, status, total, email, address){
        try {
            const responseDoc = {
                userid: ObjectId(userid),
                cart,
                status,
                total,
                email,
                address
            }
            return await order.insertOne(responseDoc)
        } catch (error) {
            console.error(`Unable to add order ${error}`)
        }
    }
    static async searchOrderDao(userid){
        let purchase
        try {
            purchase = await order.find({userid : ObjectId(userid)}).toArray()
            return purchase
        } catch (error) {
            console.error(`Unable to find order ${error}`)
        }
    }
}