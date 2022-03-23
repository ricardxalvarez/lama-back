import mongodb, { ObjectId } from 'mongodb'

let products

export default class ProductsDAO {
    static async injectDB(conn) {
        if (products){
            return
        }
        try {
            products = await conn.db(process.env.LAMA_NS).collection('products')
        } 
        catch(e) {
            console.log(`Unable to acces to db ${e}`);
        }
    }
    static async getProducts({
        filters = null,
        page = 0,
        productsPerPage = 20
    } = {}){
        let query
        if (filters){
            if ("name" in filters) {
        query = { $text: { $search: filters["name"] } }
        } else if ("category" in filters) {
        query = { "category": { $eq: filters["category"] } }
        }
        let cursor
        
        try {
              cursor = await products
              .find(query)
        } catch (e) {
          console.error(`Unable to issue find command, ${e}`)
          return { productsList: [], totalNumProducts: 0 }
        }
          const displayCursor = cursor.limit(productsPerPage).skip(productsPerPage * page)


        try {
          const productsList = await displayCursor.toArray()
          const totalNumProducts = await products.countDocuments(query)
          return { productsList, totalNumProducts }
        } catch (e) {
          console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`,
          )
          return { productsList: [], totalNumProducts: 0 }
        }
      }
    }
    static async getAllProducts(){
      let response 
      try {
        response = await products.find({}).toArray()
        return response
      } catch(e){
        console.error({status: 'error getting all items'})
      }
    }
    static async getItem(itemId){
      let product
      try {
        product = await products.find({ id: itemId}).toArray()
        return product
      } catch (error) {
        console.log(error)
      }
    }
    static async addProduct(nombre, link, colors, sizes, category, price, shipping, description, hotsale, id){
      try {
        const productDoc = {
          name: nombre,
          image: link,
          colors: colors,
          sizes: sizes,
          category: category,
          price: price,
          shipping: shipping,
          description: description,
          hotsale: hotsale,
          id: id
        }
        return await products.insertOne(productDoc)
      } catch (e) {
        console.error(`error + ${e}`)
      }
    }
    static async updateProduct(id,nombre, link, colors, sizes, category, price, shipping, description, hotsale){
      try {
        const updateResponse = await products.updateOne(
          { _id: ObjectId(id) },
          { $set: { name: nombre, image: link, colors: colors, sizes: sizes, category: category, price: price, shipping: shipping, description: description, hotsale: hotsale }}
          )
          return updateResponse
      } catch (error) {
        console.error(`Unable to update ${error}`)
      }
    }
    static async deleteProduct(productID, name){
        try {
            const deleteResponse = await products.deleteOne({
              _id: ObjectId(productID),
              name: name
            })
            return deleteResponse
        } catch (error) {
            console.error(`Unable to delete product ${e}`)
        }
    }
}