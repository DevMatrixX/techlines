import express from "express";
import asyncHandler from "express-async-handler";

import {authMiddleware, admin} from "../middleware/authMiddleware.js";
import Order from  '../models/Order.js'

const orderRoutes = express.Router()

const getOrders = async(req, res) => {
    const orders = await Order.find({})

    res.json(orders)
}

const deleteOrder = asyncHandler(async(req, res) => {
    const order = await Order.findByIdAndDelete(req.params.id)

    if(order) {
        res.json(order)
    } else {
        res.status(404).send('Order not found.')
        throw new Error("Order not found")
    }
})

const setDelivered = asyncHandler(async(req, res) => {
    const order = await Order.findById(req.params.id)

    if(order) {
        order.isDelivered = true

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404).send('Order could not be uploaded.')
        throw new Error("Order not found")
    }
})



orderRoutes.route('/').get(authMiddleware, admin, getOrders)
orderRoutes.route('/:id').put(authMiddleware, admin, setDelivered)
orderRoutes.route('/:id').delete(authMiddleware, admin, deleteOrder)

export default orderRoutes

