import express from "express"
import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'

import User from "../models/User.js";
import Order from "../models/Order.js";
import {sendVerificationEmail} from "../middleware/sendVerificationEmail.js";
import {sendPasswordResetEmail} from "../middleware/sendPasswordResetEmail.js";
import {admin, authMiddleware} from "../middleware/authMiddleware.js";

const userRoutes = express.Router()

const generateToken = id => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '2d'} )
}

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(user && await user.matchPasswords(password)){
        user.firstLogin = false

        await user.save()

        const {isAdmin, firstLogin, googleId, googleImage} = user
        const {_id, createdAt, name, active, email, } = user

        res.json({
            _id,
            name,
            active,
            email,
            isAdmin,
            googleId,
            createdAt,
            firstLogin,
            googleImage,
            token: generateToken(_id)
        })

    } else {
        res.status(401).send({message: 'Invalid email or password'})
        throw new Error('User not found')
    }
})

const signUp = asyncHandler(async(req, res) => {
    const {name, email, password} = req.body

    const existingUser = await User.findOne({email})

    if(existingUser) {
        res.status(400).send('We have an account with that email address')
    }

    const user = await User.create({name, email, password})

    if(user) {
        const {isAdmin, firstLogin, googleId, googleImage} = user
        const {_id, createdAt, active, } = user
        const token = generateToken(_id)

        sendVerificationEmail(email, name, token)

        res.status(201).json({
            _id,
            name,
            active,
            email,
            isAdmin,
            googleId,
            createdAt,
            firstLogin,
            googleImage,
            token: generateToken(_id)})

    } else {
        res.status(400).send('We could not register you')
        throw new Error('Something went wrong. Please check your information and try again')
    }


})

const verifyEmail = asyncHandler(async(req, res) => {
    const user = req.user
    user.active = true
    await user.save()

    res.json('Thanks for activating your account. You can close this window now.')


})

const passwordResetRequest = asyncHandler(async(req, res) => {
    const { email } = req.body

    try{
        const user = await User.findOne({email})

        if(user) {
            const {_id, name, email} = user

            const newToken = generateToken(_id)

            sendPasswordResetEmail(email, name, newToken)

            res.status(200).send( `We have send you a recover email to ${email}`)
        } else {
            res.status(401).send({message: 'There is not account with such an email address'})
        }

    } catch (error) {
        res.status(401).send({message: 'There is not account with such an email address'})

    }
})

const passwordReset = asyncHandler(async(req, res) => {
    const token = req.headers.authorization.split(' ')[1]

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user = await User.findById(decoded?.id)

        if(user){
            user.password = req?.body?.password

            await user.save()

            res.json('Your password has been updated successfully.')

        } else{
            res.status(404).send('User not found')
        }

    } catch (error) {
        res.status(401).send('Password reset failed')


    }
})

const googleLogin = asyncHandler(async(req, res) => {
    const { googleId, email, name, googleImage } = req.body
    
    try {
        const user = await User.findOne({ googleId })

        if(user) {
            user.firstLogin = false
            await user.save()

            const { googleId, createdAt, firstLogin, googleImage } = user
            const {  _id, name, active, email, isAdmin } = user

            res.json({
                _id,
                name,
                active,
                email,
                isAdmin,
                googleId,
                createdAt,
                firstLogin,
                googleImage,
                token: generateToken(_id)
            })
        } else {
            const newUser = await User.create({ googleId, email, name, googleImage })
            const { googleId, createdAt, firstLogin, googleImage } = newUser
            const {  _id, name, active, email, isAdmin } = newUser

            const token = generateToken(_id)

            sendVerificationEmail(email, name, token)

            res.json({
                _id,
                name,
                active,
                email,
                isAdmin,
                googleId,
                createdAt,
                firstLogin,
                googleImage,
                token: generateToken(_id)
            })
        }
        
    } catch (error) {
        res.status(400).send({ message: 'Something went wrong, please try again.'})
    }
})

const getUserOrders = asyncHandler(async(req, res) => {
    const orders = await Order.find({user: req.params.id})

    if(orders) {
        res.json(orders)
    } else {
        res.status(404).send('Orders not found.')
        throw new Error('Orders not found')
    }
})

const getUsers = asyncHandler(async(req, res) => {
    const users = await User.find({})

    res.json(users)
})

const deleteUser = asyncHandler(async(req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)

    if(user) {
        res.json(user)
    } else {
        res.status(404).send('User not found.')
        throw new Error("User not found")
    }
})

userRoutes.route('/').get(authMiddleware, admin, getUsers)
userRoutes.route('/:id').get(authMiddleware, getUserOrders)
userRoutes.route('/verify-email').get(authMiddleware, verifyEmail)

userRoutes.route('/login').post(login)
userRoutes.route('/sign-up').post(signUp)
userRoutes.route('/google-login').post(googleLogin)
userRoutes.route('/password-reset').post(passwordReset)
userRoutes.route('/password-reset-request').post(passwordResetRequest)

userRoutes.route('/:id').delete(authMiddleware, admin, deleteUser)

export default userRoutes
