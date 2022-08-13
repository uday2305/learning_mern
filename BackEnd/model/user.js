const mongoose = require('mongoose');
const addressSchema = mongoose.Schema({
    streetAddress:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    zipcode:{
        type:String
    }
});
const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"firstName required"],
    },
    lastName:{
        type:String,
        required:[true,"lastName required"],
    },
    password:{
        type:String,
        required:[true,"password required"],
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    email:{
        type:String,
        required:[true,"a valid emailId required"],
        unique:true
    },
    profileImage:{
        type:String,
        default:""
    },
    address:{
        type:addressSchema,
        default:{}
    }
},{ versionKey: false });

const UserModel = mongoose.model('users',userSchema,'users');

module.exports = UserModel;