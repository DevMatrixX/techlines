import express from "express";
import asyncHandler from "express-async-handler";

import {admin, authMiddleware} from "../middleware/authMiddleware.js";
import Product from "../models/Product.js";
import User from  '../models/User.js'

const productRoutes = express.Router()

const getProducts = async(req, res) => {
    const perPage = parseInt(req.params.perPage)
    const page = parseInt(req.params.page)

    const products = await Product.find({})

    if(page && perPage){
        const totalPages = Math.ceil(products.length / perPage)
        const startIndex = (page - 1) * perPage
        const endIndex = startIndex + perPage

        const paginatedProducts = products.slice(startIndex, endIndex)

        res.json({products: paginatedProducts, pagination: {currentPage:page, totalPages}})
    } else {
        res.json({products, pagination: {}})
    }
}

const getProduct = async(req, res) => {
    const product = await Product.findById(req?.params?.id)

    if(product) {
        res.json(product)
    } else {
        res.status(404).send('Product not found.')
        throw new Error('Product not found')
    }
}

const createReview = asyncHandler(async(req, res) => {
    const {rating, comment, userId, title} = req.body

    const product = await Product.findById(req.params.id)
    const user = await User.findById(userId)


    if(product){
        const existingReview = product.reviews.find(review => review.user.toString() === user._id.toString())

        if(existingReview) {
            res.status(400).send('Product already reviewed')
            throw new Error('Product already reviewed')
        }

        const review = {
            rating: Number(rating),
            name: user.name,
            user: userId,
            comment,
            title
        }

        product.reviews.push(review)

        product.numberOfReviews = product.reviews.length

        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()

        res.status(201).json({message: 'Review has been saved.'})
    } else {
        res.status(404).send('Product not found.')
        throw new Error('Product not found')
    }
})

const create = asyncHandler(async(req, res) => {
    const { brand, name, category, stock, subtitle, stripeId } = req.body
    const { price, images, productIsNew, description } = req.body

    const newProduct = await Product.create({
        productIsNew,
        description,
        stripeId,
        category,
        subtitle,
        images,
        price,
        brand,
        stock,
        name
    })

    const products = await Product.find({})

    if(newProduct){
        res.json(products)
    } else {
        res.status(400).send('Product could not be uploaded.')
        throw new Error('Product not created')
    }
})

const update = asyncHandler(async(req, res) => {
    const { brand, name, category, stock, id, subtitle, imageOne, imageTwo } = req.body
    const { price, images, productIsNew, description, stripeId } = req.body

    const product = await Product.findById(id)

    console.log({body: req.body})

    if(product) {
        product.images = [imageOne, imageTwo]
        product.productIsNew = productIsNew
        product.description = description
        product.stripeId = stripeId
        product.subtitle = subtitle
        product.category = category
        product.images = images
        product.price = price
        product.brand = brand
        product.stock = stock
        product.name = name

        await product.save()

        const products = await Product.find({})

        res.json(products)

    } else {
        res.status(404).send('Product not found.')
        throw new Error('Product not found')
    }
})

const removeProductReview = asyncHandler(async(req, res) => {
    const product = await Product.findById(req.params.id)

    if(product) {
        const updatedReviews = product.reviews.filter(review => review.id !== req.params.reviewId)

        product.reviews = updatedReviews
        product.numberOfReviews = product.reviews.length

        if( product.numberOfReviews > 0){
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        } else {
            product.rating = 5
        }

        await product.save()

        const products = await Product.find({})

        res.json({products, pagination: {}})

    } else {
        res.status(404).send('Product not found.')
        throw new Error("Product not found")
    }
})

const deleteProduct = asyncHandler(async(req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id)

    if(product) {
        const products = await Product.find({})

        res.json(products)
    } else {
        res.status(404).send('Product not found.')
        throw new Error('Product not found')
    }
})

productRoutes.route('/').get(getProducts)
productRoutes.route('/:id').get(getProduct)
productRoutes.route('/:page/:perPage').get(getProducts)

productRoutes.route('/').post(authMiddleware, admin, create)
productRoutes.route('/reviews/:id').post(authMiddleware, createReview)

productRoutes.route('/').put(authMiddleware, admin, update)
productRoutes.route('/:id/:reviewId').put(authMiddleware, admin, removeProductReview)

productRoutes.route('/:id').delete(authMiddleware, admin, deleteProduct)

export default productRoutes

