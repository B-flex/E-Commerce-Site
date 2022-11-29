const express = require('express')
const mongoose = require('mongoose')

var date = new Date();
var d = date.getDay()
var m = date.getMonth()
var y = date.getFullYear()
var h = date.getHours()
var mi = date.getMinutes()
const monthNames = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var dateString =  d + ', ' + monthNames[m] + ' ' + y + ' '+ h +':'+ mi
const postAdvertSchema = new mongoose.Schema({
ownerId:{
    type: String,
},
adTitle: {
    type: String
},
categories:{
type: String
},
price:{
    type: String
},
description:{
    type: String
},
image:{
    type: String
},
postedBy:{
    type: String
},
firstName:{
    type: String
},
lastName:{
    type: String
},
phoneNumber:{
    type:   String
},
address:{
    type: String
},
country: {
    type: String
},
state:{
    type: String
},
city:{
    type: String
},
TC:{
    type: String
},
date:{
    type: String,
    
    default: dateString,
}

})

postAdvertSchema.pre('save', async function (next){
    const title = this.firstName
    const title2 = this.lastName
    this.firstName = title.charAt(0).toUpperCase() + title.slice(1)
    this.lastName = title2.charAt(0).toUpperCase() + title2.slice(1)
    // title.toLowerCase()
    next()
})

const Posts = new mongoose.model('Posts', postAdvertSchema)
module.exports = Posts