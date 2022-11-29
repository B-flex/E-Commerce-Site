const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const cookieparser = require('cookie-parser')
const bcrypt = require('bcrypt')
const sharp = require('sharp')
const fileUpload = require('express-fileupload')
const nodemailer = require('nodemailer')
const nodemailerMailGun = require('nodemailer-mailgun-transport')
require('dotenv').config()

// mongoose.connect('mongodb+srv://beloved2003:enobong2003@cluster0.nzqhfq2.mongodb.net/e-commerce')
mongoose.connect('mongodb://localhost:27017/e-commerce').then(()=>{
    console.log('db connected')
})
const app = express()
const exphbs = require('express-handlebars')

app.engine('hbs', exphbs.engine({
    extname: '.hbs', defaultLayout: 'main', runtimeOptions:{
        allowProtoMethodsByDefault: true,
        allowProtoPropertiesByDefault: true
    }
}))
app.set('view engine', 'hbs' )

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(cookieparser())
app.use(fileUpload())


const homePage = require('./routes/homeRoutes')
const adminPage = require('./routes/adminRoutes')
const User = require('./models/User-Registration Model')
const Post = require('./models/postAdsModel')


app.use('/', homePage)
app.use('/admin', adminPage)







app.listen(process.env.PORT || 3700, ()=>{
    console.log('App is Listening on Port 3700')
})


