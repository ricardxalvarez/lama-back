import {ObjectID} from 'mongodb'
let user

export default class UsersDao {
    static async injectUser(conn){
        if (user){
            return 
        }
            try {
                user = conn.db(process.env.LAMA_NS).collection('user-data')
            } catch (error) {
                console.error(`Unable to get collection ${error}`)
            }
        
    }
    static async submitUser(name, lastname, username, email, password, cartlist, wishlist){
        let cursor = 
        await user.find({'username':username}).toArray()
        if (cursor.length === 0){
            try {
                const userDoc = {
                    name,
                    lastname,
                    username,
                    email,
                    password,
                    cartlist,
                    wishlist
                }
                return await user.insertOne(userDoc)
            } catch (error) {
                console.error(`Unable to submit user ${error}`)
            }
        }
    } static async logUser(username, password){
        try {
            let found = await user.find({'username': username, 'password': password}).toArray()
            return await found          
        } catch (error) {
            console.log(`Unable to find such a user ${error}`)
        }
    }
    static async getUserbyID(id){
        try {
            const pipeline = [
            {
                $match: {
                    _id: new ObjectID(id),
                },
            },
                  {
                      $lookup: {
                          from: "cart",
                          let: {
                              id: "$_id",
                          },
                          pipeline: [
                              {
                                  $match: {
                                      $expr: {
                                          $eq: ["$userid", "$$id"],
                                      },
                                  },
                              },
                              {
                                  $sort: {
                                      date: -1,
                                  },
                              },
                          ],
                          as: "cart",
                      },
                  },
                  {
                      $addFields: {
                          cart: "$cart",
                      },
                  },
              ]
              return await user.aggregate(pipeline).next()
        } catch (error) {
            console.error(`Unable to get cart ${error}`)
        }
    }
}