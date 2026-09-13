const Users = require("../models/usersModel")
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const {v4} = require('uuid');
const sendEmailOTP = require("../utiles/importentFuntion");



const signUpController = async ( req , res)=>{
     
try {
    const {userName , password , email , age} = req.body
     
    if (!userName || !password || !email || !age) {
            return res.json({
                status: false,
                message: "All fields are required"
            });
        }
    
bcrypt.hash(password, 12,async function(err, hash) {
     
    req.body.password = hash
    
    let otpCode = v4().slice(0 , 4)

    let messsageByTheTranspoter  = await sendEmailOTP(req.body.email , otpCode)

    await Users.create({...req.body , otp:otpCode})

    
return res.json({
    status: true,
    message: `User sign up successfully , ${messsageByTheTranspoter} `,
    otp: otpCode
}) 
     
});


} catch (error) {
  console.log(error);
  res.json({
        status : false ,
        message : error.message
    })
}
}




const loginController = async ( req , res)=>{

try {
    const {userName , password , } = req.body

if (userName && password ) {

    const myUser = await Users.findOne({
        userName
    })
    if(!myUser)return res.json({
        status : false ,
        message : 'username is not assest'
    })
bcrypt.compare(password, myUser.password , function(err, result) {
    if(result){
        
             const token = jwt.sign({email : myUser.email , userName : myUser.userName} , process.env.JWT_kEY)
    
    
    return res.json({
            status : true ,
            message : 'user login succesfully',
            token : token
        })

    }
return res.json({
        status : false ,
        message : 'wrong password'
    })
    
  
});



 
}
} catch (error) {
  console.log(error);
  res.json({
        status : false ,
        message : "error.message"
    })
}
}

module.exports = {signUpController , loginController}