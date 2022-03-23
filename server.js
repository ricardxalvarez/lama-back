import express from 'express'
import cors from 'cors'
import products from './api/api.router.js'
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/v1/lama', products)
app.use('*', (req, res)=> res.status(404).send({ error: "nor found"}))

export default app