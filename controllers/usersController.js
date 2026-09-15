const Users = require("../models/usersModel")
const jwt = require("jsonwebtoken");


const getUserController= async (req , res)=>{
   
    try {
      
    //  const {userName , ageStart , ageEnd , age} = req.query

    //   let query = {}

    //   if(userName){
    //     query.userName = userName
    //   }
    //   if(ageStart && ageEnd){
    //     query.age = {$gte:Number(ageStart) , $lte:Number(ageEnd)}
    //   }
    //   if(age){
    //     query.age = age
    //   }

       const findUser = await  Users.find()
    
       res.json({   
        status:true,
        message : 'user detail',
        users : findUser
       })
    } catch (error) {

        console.log(error.message);
        
    }
}



const updateUserController = async (req , res)=>{
 try {
    
        const updateDetail = req.body
        
        const token = req.headers.authorization.split(' ')[1]
    
        console.log(token);
        
        const decoded = jwt.verify(token , process.env.JWT_kEY)
    
        let updateUser = await Users.findOneAndUpdate({
               userName : decoded.userName 
        } , updateDetail)  

        if(updateUser){
          return  res.json({
            message : 'user updated successfully'
        })
    }
    
    res.json({
    message : 'not user found'
})

        
    } catch (error) {
        res.json({
            message : error.message
        })
    }
}

module.exports = {getUserController , updateUserController}