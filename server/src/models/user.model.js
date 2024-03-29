import mongoose from 'mongoose'
import crypto from 'crypto'
import mongooseUniqueValidator from 'mongoose-unique-validator'
import validate from 'mongoose-validator'

const emailValidator = [
    validate({
        validator: 'isEmail',
        message: 'Please enter valid email address '
    })
]

const nameValidator = [
    validate({
        validator: 'isAlphanumeric',
        message: 'Only letters and numbers are allowed in name'
    })
]

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:'Name is required',
        trim: true,
        maxlength: [10, "First name must be less than 10 characters"],
        unique:'Username already used',
        validate: nameValidator   
    },
    email:{
        type:String,
        unique:'Email already exists.',
        required:'Email is required',
        validate: emailValidator,
    },
    address:{
        type:Array
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    hashed_password:{
        type:String,
        required: 'Password is required'
    },
    salt:String
})
UserSchema.path("email").validate(async function (email) {
    const user = await this.constructor.findOne({ email });    
if (user) {    if (this.id === user.id) {    return true;    }    return false;    }    
return true;   }, "Email already exists!");

UserSchema.path("name").validate(async function (name) {
    const user = await this.constructor.findOne({ name });    
if (user) {    if (this.id === user.id) {    return true;    }    return false;    }    
return true;   }, "Name already exists!");

UserSchema.virtual('password')
.set(function(password){
    this._password = password,
    this.salt = this.makeSalt(),
    this.hashed_password = this.encryptPassword(password)
})

UserSchema.methods = {
    
    authenticate: function(plainText){
        return this.encryptPassword(plainText) === this.hashed_password
    },
    encryptPassword: function(password){
        if(!password) return ''
        try{
            return crypto
            .createHmac('sha1', this.salt)
            .update(password)
            .digest('hex')
        }catch(err){
            return err
        }
    },
    makeSalt: function(){
        return Math.round((new Date().valueOf() * Math.random())) + ''
    }
}

UserSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length < 6){
        this.invalidate('password', 'Password must be at least 6 characters')
    }
}, null)

export default mongoose.model('User', UserSchema)
