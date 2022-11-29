const express = require('express')
const routes = express.Router()
const User = require('../models/User-Registration Model')
const Post = require('../models/postAdsModel')
const setUser = require('../middlewares/setUser')
const checkAdmin = require('../middlewares/setAdminUser')
const {getalluserspost,deletePost,deleteUser , getallusers } = require('../controllers/adminControllers')


routes.get('/all-users-post', setUser, checkAdmin, getalluserspost )
routes.get('/all-registeredUsers', setUser, checkAdmin, getallusers )

routes.get('/deleteUserPost/:id', deletePost )
routes.get('/deleteUser/:id', deleteUser  )














module.exports = routes