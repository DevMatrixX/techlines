import bcrypt from 'bcryptjs'
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
   name : {type: String, required: true},
   email : {type: String, required: true, unique: true},
   password : {type: String},
   active : {type: Boolean, default: false},
   isAdmin : {type: Boolean, default: false},
   firstLogin : {type: Boolean, default: true},
   googleImage : {type: String, default: undefined},
   googleId : {type: String, default: undefined},
    },
    {timestamps: true}
)

userSchema.methods.matchPasswords = async function (password) {
   return await bcrypt.compare(password, this.password)
}

userSchema.pre('save', async function (next) {
    if(!this.isModified('password')) {
        next()
    }

   this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('User', userSchema)

export default User