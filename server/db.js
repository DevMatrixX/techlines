import mongoose from 'mongoose'

const connectToDatabase = async() => {
    try{
        mongoose.set('strictQuery', false)

        const connect = await mongoose.connect(process.env.MONGO_URI)

        console.log(`DB connected ${connect?.connection?.host}`)
    }
    catch (error) {
        console.log(error?.message)
    }
}

export default connectToDatabase