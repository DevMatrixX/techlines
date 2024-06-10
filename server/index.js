import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import * as path from "path";

import productRoutes from "./routes/productRoutes.js";
import stripeRoutes from "./routes/stripeRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from './routes/userRoutes.js'
import connectToDatabase from "./db.js";

dotenv.config()

connectToDatabase()

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api/products', productRoutes)
app.use('/api/checkout', stripeRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)

app.get('/api/config/google', (req, res) => res.send(process.env.GOOGLE_CLIENT_ID) )

const port = 4000

const __dirname = path.resolve()

app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

   if(process.env.NODE_ENV === 'production') {
       app.use(express.static(path.join(__dirname,  '/client/build')))

       app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
   }

app.listen(port, () => console.log(`Server running on port ${port}`))