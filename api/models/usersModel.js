const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userName : {
        type : String,
        required : true,
        unique: true

    },
    email:{
        type : String,
        required : true,
        unique: true
    },
    password:{
        type : String,
        required : true,
        minlength: 8
    },
    age:{
        type : Number,
        required : true,
    },
    otp:{
        type : String
    }
})

const Users = mongoose.model("Users" , UserSchema);

module.exports = Users 

