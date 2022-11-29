const express = require('express')
const User = require('../models/User-Registration Model')
const Post = require('../models/postAdsModel')

const getalluserspost = async (req, res)=>{
    const posts = await Post.find().sort({date: -1})
    const postss = await Post.find().countDocuments()
    const currentUser = req.user
    const role = req.user.role
    const profile = req.user.image
    const username = req.user.username
    res.render('account-myads', {posts, username, profile, currentUser, role, postss})
}
const getallusers = async (req, res)=>{
    const users = await User.find().sort({date: -1})
    const userss = await User.find().countDocuments()
    const currentUser = req.user
    const role = req.user.role
    const profile = req.user.image
    const username = req.user.username
    res.render('all-registeredUsers', {users,userss, currentUser, role, profile, username})
}

const deletePost = async(req, res)=>{
    const post = req.params.id
    const deletePost = await Post.findByIdAndDelete({_id: post})
    res.redirect('/admin/all-users-post')
}
const deleteUser = async(req, res)=>{
    const user = req.params.id
    const deleteUser = await User.findByIdAndDelete({_id: user})
    res.redirect('/admin/all-registeredUsers')
}





module.exports={getallusers, getalluserspost,deleteUser, deletePost }