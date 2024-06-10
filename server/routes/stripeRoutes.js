import Stripe from "stripe";
import dotenv from "dotenv";
import express from "express";

import Order from "../models/Order.js";
import Product from "../models/Product.js";
import {authMiddleware} from "../middleware/authMiddleware.js";

dotenv.config()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const stripeRoute = express.Router()

const stripePayment = async(req, res) => {
    const data = req.body

    const lineItems = [{
        quantity: 1,
        price: data.shipping == 14.99 ? process.env.EXPRESS_SHIPPING_ID: process.env.STANDART_SHIPPING_ID
    }]

   data.cartItems.forEach(item => {
       lineItems.push({
           price: item.stripeId,
           quantity: item.qty
       })
   })

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel'
    })

    const { _id: user, name: username, email } = data.userInfo

    const order = new Order({
        totalPrice: data.subtotal + data.shipping,
        shippingAddress: data.shippingAddress,
        shippingPrice: data.shipping,
        orderItems: data.cartItems,
        subtotal: data.subtotal,
        username,
        email,
        user,
    })

    const newOrder = await order.save()

    for (const cartItem of data.cartItems) {
        const product = await Product.findById(cartItem.id)
        product.stock = product.stock - cartItem.qty

        await product.save()
       }

    res.send(JSON.stringify({orderId: newOrder._id.toString(), url: session.url}))
}

stripeRoute.route('/').post(authMiddleware, stripePayment)

export default stripeRoute