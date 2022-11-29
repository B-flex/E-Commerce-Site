const User = require('../models/User-Registration Model')

const checkAdmin = async(req, res, next)=>{

    const role = req.user.role
    // let isAdmin = role
    if(role === "admin"){
        // let isAdmin = true;
        next()
    }else{
        // let isAdmin = false
        res.send('You are Not Allowed To View This Page')
    }
    }


module.exports = checkAdmin