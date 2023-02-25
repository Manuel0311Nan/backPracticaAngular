import {Schema, model} from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";


let userSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    emoji: {
        type: String
    }
},{
        collection: 'users'
})
    
userSchema.plugin(mongooseUniqueValidator, { message: 'Email already in use.' });

const User = model('User', userSchema)

export { User }