const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cookie = require('cookie-parser')
const User = require('../models/User-Registration Model')

const setUser = async(req, res, next)=>{

    const auth = req.cookies.authen
    
    const secretKey = 'scatteringUserToken'
    if(auth){
        const decoded = jwt.verify(auth, 'scatteringUserToken')  
           const userId = decoded.foundUserId
    currentUser = await User.findById(userId)
    req.user = currentUser
    // console.log(req.user)
        next()
    } else{
        res.redirect('/welcome')
    }
    }


module.exports = setUser