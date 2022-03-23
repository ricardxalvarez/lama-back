import ProductsDAO from "../DAO/products.dao.js";

export default class ProductsController {
    static async getApiProducts(req, res, next) {
        const productsPerPage = req.query.productsPerPage ? parseInt(req.query.productsPerPage, 10): 20
        const page = req.query.page ? parseInt(req.query.page) : 0
        let filters = {}
        if (req.query.category){
            filters.category = req.query.category
        } else if (req.query.name){
            filters.name = req.query.name
        }
        const {productsList, totalNumProducts} = await ProductsDAO.getProducts({
            filters,
            page,
            productsPerPage
        })
        let response = {
            products: productsList,
            page: page,
            filters: filters,
            entries_per_page: productsPerPage,
            total_results: totalNumProducts
                }
        res.json(response)
    }
    static async getAllProducts(req,res, next){
        let response = await ProductsDAO.getAllProducts()
        res.json({response})
    }
    static async getItemById(req, res, next){
        const id = req.query.id
        let product = await ProductsDAO.getItem(id)
        res.json({product})
    }
    static async postApiProducts(req, res, next){
        try {
            const name = req.body.name
            const image = req.body.image
            const colors = req.body.colors
            const sizes = req.body.sizes
            const category = req.body.category
            const price = req.body.price
            const shipping = req.body.shipping
            const description = req.body.description
            const hotsale = req.body.hotsale
            const id = req.body.id

            await ProductsDAO.addProduct(
                name,
                image,
                colors,
                sizes,
                category,
                price,
                shipping,
                description,
                hotsale,
                id
            )
            res.json({success: 'ok'})
        } catch (e) {
            res.json({error : e})
        }
    }

    static async apiUpdateProduct(req,res,next){
        const name = req.body.name
        const image = req.body.image
        const colors = req.body.colors
        const sizes = req.body.sizes
        const category = req.body.category
        const price = req.body.price
        const shipping = req.body.shipping
        const description = req.body.description
        const hotsale = req.body.hotsale
        const id = req.body.id
        const productResponse = ProductsDAO.updateProduct(
            id,
            name,
            image,
            colors,
            sizes,
            category,
            price,
            shipping,
            description,
            hotsale
        )
        var { error } = productResponse
      if (error) {
        res.status(400).json({ error })
      }

      if (productResponse.modifiedCount === 0) {
        throw new Error(
          "unable to update product - user may not be original poster",
        )
      }

      res.json({ status: "success" })
    }
    static async apiDeleteProduct(req,res, next){
        try {
            const productID = req.query.id
            const name = req.body.name
            const productResponse = await ProductsDAO.deleteProduct(productID, name)
            res.json({status: 'success'})
        } catch (error) {
            res.status(500).json({status: 'error'})
        }
    }
}