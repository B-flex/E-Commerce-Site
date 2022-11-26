const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userRegistrationModel = new mongoose.Schema ({
 username: {
     type: String,
 },
 email: {
     type: String,
     required: true,
 },
 password: {
     type: String,
     required: true,
 },
 image:{
     type: String,
 },
 role: {
    type: String,
    default: 'subscriber'
 }
})

userRegistrationModel.pre('save', async function(next){
    let password = this.password
    const hashedPassword = await bcrypt.hash(password, 11)
    this.password = hashedPassword
    next()
})

const User = new mongoose.model('User', userRegistrationModel)

module.exports = User