import app from './server.js'
import mongodb from 'mongodb'
import dotenv from 'dotenv'
import ProductsDAO from './DAO/products.dao.js'
import Password from './DAO/password.dao.js'
import User from './DAO/users.dao.js'
import Cart from './DAO/cart.dao.js'
dotenv.config()
import OrdersDAO from './DAO/orders.dao.js'
const MongoClient = mongodb.MongoClient
const port = process.env.PORT || 8000
const hostname = '0.0.0.0'
MongoClient.connect(process.env.PRODUCTS_DB_URI)
    .catch( err => {
        console.log(`this error ${err}`);
        process.exit(1)
    })
    .then( async (client)=>{
            await ProductsDAO.injectDB(client)
            await Password.injectDB(client)
            await User.injectUser(client)
            await Cart.injectDB(client)
            await OrdersDAO.injectDB(client)
            app.listen(port, ()=>{
                console.log(`app listening at: ${hostname} on port ${port}...`)
            })
        }
    )


