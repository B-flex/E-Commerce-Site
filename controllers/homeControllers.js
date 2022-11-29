const express = require('express')
const User = require('../models/User-Registration Model')
const Post = require('../models/postAdsModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')
const nodemailer = require('nodemailer')
const nodemailerMailGun = require('nodemailer-mailgun-transport')
const nodePopup = require('node-popup/dist/cjs.js')
const alert = require('alert')
const { addAbortSignal } = require('nodemailer/lib/xoauth2')
// const { message } = require('statuses')
// const popup = require('popups/dist/popupS')
// const alert = require('alert')
require('dotenv').config()

const getWelcomePage=(req, res)=>{
    res.render('index-2')
}

const getHomePage = async (req, res) => {
    const username = req.user.username
    const dataBase = await Post.find().sort({ date: -1 }).limit(6)


    const countryData = await Post.findOne({country: 'Nigeria'})
    // const coun = countryData.image
    const totalPost = await Post.count({country: 'Nigeria'})
    // const countryDataImage = countryData.image

    const countryData2 = await Post.findOne({country: 'USA'})
    const totalPosts = await Post.count({country: 'USA'})

    const countryData3 = await Post.findOne({country: 'Ghana'})
    const totalPostss = await Post.count({country: 'Ghana'})

    const countryData4 = await Post.findOne({country: 'Liberia'})
    const totalPostsss = await Post.count({country: 'Liberia'})

    const countryData5 = await Post.findOne({country: 'Brazil'})
    const totalPostssss = await Post.count({country: 'Brazil'})

    const countryData6 = await Post.findOne({country: 'Other'})
    const totalPostsssss = await Post.count({country: 'Other'})

    const totalAds = await Post.count()
    const totalMembers = await User.count()
    // const countryImageCount = countryDataId.count()
    // console.log(totalPost)
    // const image = req.user.image
    // console.log(dataBase)
    res.render('index-3', { countryData2,countryData4,countryData3,countryData6,countryData5, username, currentUser, dataBase,totalAds,totalMembers, totalPost,totalPosts,totalPostss, totalPostsss,totalPostssss,totalPostsssss })
}
const getRegisterPage = (req, res) => {
    res.render('register')
}
const getLoginPage = (req, res) => {
    res.render('login')
}

//PAGINATION AND DATABASE RENDERING FOR CATEGORY PAGE

const getCategoriesPage = async (req, res) => {
    const username = req.user.username
    let page = req.query.page
    const count = await Post.find().countDocuments()
    let totalPages = Math.ceil(count/3)
    let allPages = []
    for(let i = 1; i<=totalPages; i++){
       allPages.push({
           pageNumber: i
       })
    //    console.log(allPages)
    }
    // console.log(count)
    let previous = Number(page) - Number(1)
    let next = Number(page) + Number(1)

    if(previous < 1){
        previous = null
    }

    if(next > allPages.length){
        next = null
    }
    
    const allProducts = await Post.find().limit(3).sort({date: -1}).skip( (page-1) * 3)

    const hotel       = await Post.findOne({categories: 'hotel & travels'}).countDocuments()
    const services    = await Post.findOne({categories: 'services'}).countDocuments()
    const mobiles     = await Post.findOne({categories: 'mobiles'}).countDocuments()
    const training    = await Post.findOne({categories: 'training'}).countDocuments()
    const vehicles    = await Post.findOne({categories: 'vehicles'}).countDocuments()
    const pets        = await Post.findOne({categories: 'pets'}).countDocuments()
    const foods       = await Post.findOne({categories: 'foods'}).countDocuments()
    const realEstate  = await Post.findOne({categories: 'real Estate'}).countDocuments()
    const clothes        = await Post.findOne({categories: 'clothes & accessories'}).countDocuments()
    const electronics = await Post.findOne({categories: 'electronics'}).countDocuments()
    const other       = await Post.findOne({categories: 'other'}).countDocuments()
    // console.log(allProducts)
    res.render('category', {hotel,services,mobiles,training,vehicles,pets,foods,realEstate,clothes, electronics,other ,currentUser, username, allProducts, allPages, previous, next, count })
}


//PAGINATION AND DATABASE RENDERING FOR AGGRID PAGE

const getadGridPage = async (req, res) => {
    const username = req.user.username
    let page = req.query.page
    const count = await Post.find().countDocuments()
    let totalPages = Math.ceil(count/4)
    let allPages = []
    for(let i = 1; i<=totalPages; i++){
       allPages.push({
           pageNumber: i
       })
    //    console.log(allPages)
    }
    // console.log(count)
    let previous = Number(page) - Number(1)
    let next = Number(page) + Number(1)

    if(previous < 1){
        previous = null
    }

    if(next > allPages.length){
        next = null
    }
    
    const allProducts = await Post.find().limit(4).sort({date: -1}).skip( (page-1) * 4)

    const hotel       = await Post.findOne({categories: 'hotel & travels'}).countDocuments()
    const services    = await Post.findOne({categories: 'services'}).countDocuments()
    const mobiles     = await Post.findOne({categories: 'mobiles'}).countDocuments()
    const training    = await Post.findOne({categories: 'training'}).countDocuments()
    const vehicles    = await Post.findOne({categories: 'vehicles'}).countDocuments()
    const pets        = await Post.findOne({categories: 'pets'}).countDocuments()
    const foods       = await Post.findOne({categories: 'foods'}).countDocuments()
    const realEstate  = await Post.findOne({categories: 'real Estate'}).countDocuments()
    const clothes        = await Post.findOne({categories: 'clothes & accessories'}).countDocuments()
    const electronics = await Post.findOne({categories: 'electronics'}).countDocuments()
    const other       = await Post.findOne({categories: 'other'}).countDocuments()
    // console.log(allProducts)
    res.render('adlistinggrid', {hotel,services,mobiles,training,vehicles,pets,foods,realEstate,clothes,electronics,other ,currentUser, username, allProducts, allPages, previous, next, count })
}


//PAGINATION AND DATABASE RENDERING FOR ADLISTING PAGE

const getadListPage = async (req, res) => {
    const username = req.user.username
    let page = req.query.page
    const count = await Post.find().countDocuments()
    let totalPages = Math.ceil(count/3)
    let allPages = []
    for(let i = 1; i<=totalPages; i++){
       allPages.push({
           pageNumber: i
       })
    //    console.log(allPages)
    }
    // console.log(count)
    let previous = Number(page) - Number(1)
    let next = Number(page) + Number(1)

    if(previous < 1){
        previous = null
    }

    if(next > allPages.length){
        next = null
    }
    
    const allProducts = await Post.find().limit(5).sort({date: -1}).skip( (page-1) * 5)

    const hotel       = await Post.findOne({categories: 'hotel & travels'}).countDocuments()
    const services    = await Post.findOne({categories: 'services'}).countDocuments()
    const mobiles     = await Post.findOne({categories: 'mobiles'}).countDocuments()
    const training    = await Post.findOne({categories: 'training'}).countDocuments()
    const vehicles    = await Post.findOne({categories: 'vehicles'}).countDocuments()
    const pets        = await Post.findOne({categories: 'pets'}).countDocuments()
    const foods       = await Post.findOne({categories: 'foods'}).countDocuments()
    const realEstate  = await Post.findOne({categories: 'real Estate'}).countDocuments()
    const clothes     = await Post.findOne({categories: 'clothes & accessories'}).countDocuments()
    const electronics = await Post.findOne({categories: 'electronics'}).countDocuments()
    const other       = await Post.findOne({categories: 'other'}).countDocuments()
    // console.log(allProducts)
    res.render('adlistinglist', {hotel,services,mobiles,training,vehicles,pets,foods,realEstate,clothes,electronics,other ,currentUser, username, allProducts, allPages, previous, next, count })
    
}

const getadListDetailPage = async(req, res) => {
    const username = req.user.username
    const product = req.params.id
    const productData = await Post.findOne({_id: product})
    const productImage = productData.image
    const firstName = productData.firstName
    const lastName = productData.lastName
    const price = productData.price
    const title = productData.adTitle
    const date = productData.date
    const country = productData.country
    const body = productData.description
    const category = productData.categories
    const phone = productData.phoneNumber
     console.log(productData)
    //MORE ADS FROM OWNER PAGE
    const ownerId = productData.ownerId
    const ownerData = await User.findOne({_id: ownerId})
    const ownerImg = ownerData.image
    const ownerDb = await Post.find({ownerId: ownerId}).limit(5).sort({date: -1})
    
    console.log( ownerData)
    // const body = productData.description
    // console.log(productData)
    res.render('ads-details', { currentUser,ownerImg, username, product, productImage, category, phone, firstName, lastName,  price, title, date, country, body, ownerDb })
}

const getaboutPage = async (req, res) => {
    const username = req.user.username
    const totalAds = await Post.count()
    const totalMembers = await User.count()
    res.render('about', { currentUser, username, totalAds, totalMembers })
}
const getServicesPage = async (req, res) => {
    const username = req.user.username
    const totalAds = await Post.count()
    const totalMembers = await User.count()
    res.render('services', { currentUser, username,totalAds, totalMembers })
}

const getpostAdsPage = async (req, res, next) => {
    const username = req.user.username
    const role = req.user.role
    const profile = req.user.image
    let isAdmin = role
    if(role === "admin"){
       isAdmin = true 
    }else{
        isAdmin = false
    }
    
    // console.log(user)
    res.render('post-ads', { username, role, profile, isAdmin})
}

const getPackagesPage = async (req, res) => {
    const username = req.user.username
    res.render('pricing', { username, currentUser })
}
const gettestimonialPage = async (req, res) => {
    const username = req.user.username
    res.render('testimonial', { username, currentUser })
}
const getfaqPage = async (req, res) => {
    const username = req.user.username
    res.render('faq', { username, currentUser })
}
const get404Page = (req, res) => {
    const username = req.user.username
    res.render('404',{username, currentUser})
}
const getBlogRightSidePage = async (req, res) => {
    const username = req.user.username
    res.render('blog', { username, currentUser })
}
const getBlogLeftSidePage = async (req, res) => {
    const username = req.user.username
    res.render('blog-left-sidebar', { username, currentUser })
}
const getBlogGridFullWidthPage = async (req, res) => {
    const username = req.user.username
    res.render('blog-grid-full-width', { username, currentUser })
}
const getBlogDetailsPage = async (req, res) => {
    const username = req.user.username
    res.render('single-post', { username, currentUser })
}
const getContactPage = async (req, res) => {
    const username = req.user.username
    res.render('contact', { username, currentUser })
}
const getDashboardPage = async (req, res) => {
    const currentUser = req.user
    const userIden = currentUser._id
    const username = req.user.username
    const role = req.user.role
    const profile = req.user.image
    const dataOwner = await Post.find({ownerId: userIden})
    const dataOwnerCount = await Post.find({ownerId: userIden}).countDocuments()

    res.render('dashboard', { username, currentUser, dataOwnerCount,role, profile, dataOwner})
}
const getAccountMyAds = async(req, res)=>{
    const username = req.user.username
    const profile = req.user.image
    const role = req.user.role
    res.render('account-myads', {username, currentUser, profile, role})
}
const getOfferMessages= async(req, res)=>{
    const username = req.user.username
    const profile = req.user.image
    const role = req.user.role
    const product = req.params.id
    const productData = await Post.find({_id: product}).limit(1)
    res.render('offermessages', {username, currentUser, profile, role,  productData })
}
const getPaymentsPage = async(req, res)=>{
    const username = req.user.username
    res.render('payments', {username, currentUser})
}
const getaccountFavouriteAds = async(req, res)=>{
    const username = req.user.username
    res.render('account-favourite-ads', {username, currentUser})
}
const getAccountProfileSetting = async(req, res)=>{
    const username = req.user.username
    const profile = req.user.image
    const role = req.user.role
    res.render('account-profile-setting', {username, profile,role, currentUser})
}


const checkUserConfirmPassword = (req, res, next) => {
    const mainPassword = req.body.password1
    const reTypedPassword = req.body.password2

    if (mainPassword === reTypedPassword) {
        next()
    } else {
        const wrongInput = "Passwords Do Not Match Please Check And Try Again"
        res.render('register', { wrongInput })
    }
}
const checkUsername = async (req, res, next) => {

    const newUsername = req.body.email
    const takenUsername = await User.findOne({ email: newUsername })

    if (takenUsername) {
        const usernamemessage = "Duplicate User Credentials Please Check Username/Email"
        res.render('register', { usernamemessage })
    } else {
        next()
    }
}


const getUserDetails = (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password1
    })

    res.redirect("/login")
}


const authenticateLogin = async (req, res, next) => {
    const claimedEmail = req.body.email
    const claimedPassword = req.body.password
    const foundUser = await User.findOne({ email: claimedEmail })
 
    if (foundUser) {
        const comparison = bcrypt.compareSync(claimedPassword, foundUser.password)
        if (comparison === true) {
            const foundUserId = await foundUser._id
            

            const checkBox = req.body.checkBox
            if (checkBox) {
                
                const token = jwt.sign({ foundUserId }, 'scatteringTokens', { expiresIn: '5184000000' })
               

                res.cookie('Auth', token, { maxAge: 34560004000 })
                // console.log(token)
             res.redirect('/' )
            } else {
                
                const token = jwt.sign({ foundUserId }, 'scatteringTokens', { expiresIn: '5184000000' })
                // console.log(currentUser)
                

                res.cookie('Auth', token)
                res.redirect('/' )
            }

        } else {
            res.render('login', { error: 'Password Mismatch / Incorrect Password' })
        }
    } else {
        res.render('login', { error: 'Username / Email Not Recognized!!!' })
    }
    // console.log(token)
}


const postAdvertsToDatabase = (req, res) => {
    const imgFile = req.files.image
    const imageName = imgFile.name
    const imgUploadPath = `./public/uploadedImages/${imageName}`

    imgFile.mv(imgUploadPath)

    Post.create({
        ownerId: req.user._id,
        adTitle: req.body.title,
        categories: req.body.categories,
        price: req.body.price,
        description: req.body.description,
        image: `/uploadedImages/${imageName}`,
        postedBy: req.body.usertype,
        firstName: req.body.name,
        lastName: req.body.lastName,
        phoneNumber: req.body.phone,
        address: req.body.address,
        country: req.body.country,
        state: req.body.state,
        city: req.body.city,
        TC: req.body.TCagree
    })
    

    res.redirect('/')

}

const logOut = async (req, res) => {
    res.cookie('Auth', '', { maxAge: 10 })

    res.redirect('/login')
}


const postSearchBox = async(req, res)=>{
    

    // const categorySearch = await Post.filter((e)=>{
    //    const title = e.title

    //    return title.includes(searchedProduct)

    // })
    // console.log(categorySearch)
    
    const currentUser = req.user
    const username = req.user.username
    let page = req.query.page



    const searchedProduct = req.body.customword
    const allProducts = await Post.find({adTitle: {$regex: searchedProduct, $options: "i"} })
    // .limit(3).sort({date: -1}).skip( (page-1) * 3)
    const count = await Post.find({adTitle: {$regex: searchedProduct, $options: "i"} }).countDocuments()


    // let totalPages = Math.ceil(count/3)
    // let allPages = []
    // for(let i = 1; i<=totalPages; i++){
    //    allPages.push({
    //        pageNumber: i
    //    })
    // //    console.log(allPages)
    // }
    // // console.log(count)
    // let previous = Number(page) - Number(1)
    // let next = Number(page) + Number(1)

    // if(previous < 1){
    //     previous = null
    // }

    // if(next > allPages.length){
    //     next = null
    // }
    

    const hotel       = await Post.findOne({categories: 'hotel & travels'}).countDocuments()
    const services    = await Post.findOne({categories: 'services'}).countDocuments()
    const mobiles     = await Post.findOne({categories: 'mobiles'}).countDocuments()
    const training    = await Post.findOne({categories: 'training'}).countDocuments()
    const vehicles    = await Post.findOne({categories: 'vehicles'}).countDocuments()
    const pets        = await Post.findOne({categories: 'pets'}).countDocuments()
    const foods       = await Post.findOne({categories: 'foods'}).countDocuments()
    const realEstate  = await Post.findOne({categories: 'real Estate'}).countDocuments()
    const clothes        = await Post.findOne({categories: 'clothes & accessories'}).countDocuments()
    const electronics = await Post.findOne({categories: 'electronics'}).countDocuments()
    const other       = await Post.findOne({categories: 'other'}).countDocuments()
    // console.log(allProducts)
    res.render('adlistinggrid', {hotel,services,mobiles,training,vehicles,pets,foods,realEstate,clothes, electronics,other ,currentUser, username, allProducts, count })
    
    // if(category && location){
    //      res.render('category', {products, currentUser, username})
    // }else{
    //     res.redirect('/404')
    // }
    // console.log(products)

}



//DIFFERENT CATEGORY PAGES RENDEREING FOR CATEGORY, ADGRID AND ADLISTING PAGE

const getAdgridSection = async (req, res)=>{
    
    const category = req.params.category
    
    const categoryPosted = await Post.find({categories: category})
    
    const categoryPosted3 = await Post.findOne({categories: category})
    // const paginationCategory = categoryPosted3.categories
    const username = req.user.username
    let page = req.query.page
    const count = await Post.find({categories: category}).countDocuments()
    let totalPages = Math.ceil(count/4)
    let allPages = []
    for(let i = 1; i<=totalPages; i++){
       allPages.push({
           pageNumber: i,
           category : req.params.category
       })
    //    console.log(allPages)
    }
    // console.log(count)
    let previous = Number(page) - Number(1)
    let next = Number(page) + Number(1)

    if(previous < 1){
        previous = null
    }

    if(next > allPages.length){
        next = null
    }
    
    const allProducts = await Post.find({categories: category}).limit(4).sort({date: -1}).skip( (page-1) * 4)

    const hotel       = await Post.findOne({categories: 'hotel & travels'}).countDocuments()
    const services    = await Post.findOne({categories: 'services'}).countDocuments()
    const mobiles     = await Post.findOne({categories: 'mobiles'}).countDocuments()
    const training    = await Post.findOne({categories: 'training'}).countDocuments()
    const vehicles    = await Post.findOne({categories: 'vehicles'}).countDocuments()
    const pets        = await Post.findOne({categories: 'pets'}).countDocuments()
    const foods       = await Post.findOne({categories: 'foods'}).countDocuments()
    const realEstate  = await Post.findOne({categories: 'real Estate'}).countDocuments()
    const clothes        = await Post.findOne({categories: 'clothes & accessories'}).countDocuments()
    const electronics = await Post.findOne({categories: 'electronics'}).countDocuments()
    const other       = await Post.findOne({categories: 'other'}).countDocuments()
//  console.log(paginationCategory)
    
    res.render('adlistinggrid', {categoryPosted,categoryPosted3, category, hotel,services,mobiles,training,vehicles,pets,foods,realEstate,clothes,electronics,other ,currentUser, username, allProducts, allPages, previous, next, count })


}


const getAdListSection = async(req, res)=>{
    const category = req.params.category
    
    const categoryPosted = await Post.find({categories: category})
    
    const categoryPosted3 = await Post.findOne({categories: category})
    // const paginationCategory = categoryPosted3.categories
    const username = req.user.username
    let page = req.query.page
    const count = await Post.find({categories: category}).countDocuments()
    let totalPages = Math.ceil(count/5)
    let allPages = []
    for(let i = 1; i<=totalPages; i++){
       allPages.push({
           pageNumber: i,
           category : req.params.category
       })
    //    console.log(allPages)
    }
    // console.log(count)
    let previous = Number(page) - Number(1)
    let next = Number(page) + Number(1)

    if(previous < 1){
        previous = null
    }

    if(next > allPages.length){
        next = null
    }
    
    const allProducts = await Post.find({categories: category}).limit(5).sort({date: -1}).skip( (page-1) * 5)

    const hotel       = await Post.findOne({categories: 'hotel & travels'}).countDocuments()
    const services    = await Post.findOne({categories: 'services'}).countDocuments()
    const mobiles     = await Post.findOne({categories: 'mobiles'}).countDocuments()
    const training    = await Post.findOne({categories: 'training'}).countDocuments()
    const vehicles    = await Post.findOne({categories: 'vehicles'}).countDocuments()
    const pets        = await Post.findOne({categories: 'pets'}).countDocuments()
    const foods       = await Post.findOne({categories: 'foods'}).countDocuments()
    const realEstate  = await Post.findOne({categories: 'real Estate'}).countDocuments()
    const clothes        = await Post.findOne({categories: 'clothes & accessories'}).countDocuments()
    const electronics = await Post.findOne({categories: 'electronics'}).countDocuments()
    const other       = await Post.findOne({categories: 'other'}).countDocuments()
//  console.log(paginationCategory)
    
    res.render('adlistinglist', {categoryPosted,categoryPosted3, category, hotel,services,mobiles,training,vehicles,pets,foods,realEstate,clothes,electronics,other ,currentUser, username, allProducts, allPages, previous, next, count })

}

const getCategorySections = async(req, res)=>{
    const category = req.params.category
    
    const categoryPosted = await Post.find({categories: category})
    
    const categoryPosted3 = await Post.findOne({categories: category})
    // const paginationCategory = categoryPosted3.categories
    const username = req.user.username
    let page = req.query.page
    const count = await Post.find({categories: category}).countDocuments()
    let totalPages = Math.ceil(count/3)
    let allPages = []
    for(let i = 1; i<=totalPages; i++){
       allPages.push({
           pageNumber: i,
           category : req.params.category
       })
    //    console.log(allPages)
    }
    // console.log(count)
    let previous = Number(page) - Number(1)
    let next = Number(page) + Number(1)

    if(previous < 1){
        previous = null
    }

    if(next > allPages.length){
        next = null
    }
    
    const allProducts = await Post.find({categories: category}).limit(3).sort({date: -1}).skip( (page-1) * 3)

    const hotel       = await Post.findOne({categories: 'hotel & travels'}).countDocuments()
    const services    = await Post.findOne({categories: 'services'}).countDocuments()
    const mobiles     = await Post.findOne({categories: 'mobiles'}).countDocuments()
    const training    = await Post.findOne({categories: 'training'}).countDocuments()
    const vehicles    = await Post.findOne({categories: 'vehicles'}).countDocuments()
    const pets        = await Post.findOne({categories: 'pets'}).countDocuments()
    const foods       = await Post.findOne({categories: 'foods'}).countDocuments()
    const realEstate  = await Post.findOne({categories: 'real Estate'}).countDocuments()
    const clothes        = await Post.findOne({categories: 'clothes & accessories'}).countDocuments()
    const electronics = await Post.findOne({categories: 'electronics'}).countDocuments()
    const other       = await Post.findOne({categories: 'other'}).countDocuments()
//  console.log(paginationCategory)
    
    res.render('category', {categoryPosted,categoryPosted3, category, hotel,services,mobiles,training,vehicles,pets,foods,realEstate,clothes,electronics,other ,currentUser, username, allProducts, allPages, previous, next, count })


    

}

const sendMessage = async (req, res)=>{
    const name = req.body.name
    const email = req.body.email
    const subject = req.body.product
    const message = req.body.phone


    const mailgunAuth = {
            auth: {
                api_key: process.env.MAILGUN_API_KEY,
                domain: process.env.MAILGUN_DOMAIN
            }
        }
const transporter = await nodemailer.createTransport(nodemailerMailGun(mailgunAuth))
const data = {
    from: email ,
    to: 'mernstackdeveloperz@gmail.com',
    subject: `I would like to purchase a ${subject}`,
    text: `Please is ${subject} available?? i would love to purchase it, Here is my number ${message}`
}

transporter.sendMail(data, (err, body)=>{
    if(err){
        console.log(err)
    }
    
})
// popup.alert({
//     content: 'Message Sent'
// })
alert('Message Sent Successfully')
res.redirect('/')
// res.json('sent')
// alert('Message Sent Successfully')

}

const deleteDashboardPosts = async (req, res)=>{
    const post = req.params.id
    const deletePost = await Post.findByIdAndDelete({_id: post})
    res.redirect('/dashboard')
}
const changeUserDetails = async(req, res)=>{
    const username = req.user.username
    const userId = req.user._id
    const newUsernameDetail = req.body.username
    const oldPasswordDetail = req.body.oldPassword
    const newPassword = req.body.newPassword
    const newEmailDetail = req.body.email
    const profilePicture = req.files.image
    const uploadPicture = profilePicture.name
    const movePicture = `./public/uploadedImages/${uploadPicture}`
    profilePicture.mv(movePicture)

    const currentUser= req.user

    const oldPasswordDetails = req.user.password
    const oldPassword = await bcrypt.compareSync(oldPasswordDetail, oldPasswordDetails )
    console.log(oldPassword)
    // const changePassword = await User.findOneAndUpdate({password: oldPassword, update: bcrypt.hash(newPassword, 12)})
    if(oldPassword === true){ 
        const changePassword = await bcrypt.hash(newPassword, 12)
        const newUsername = newUsernameDetail
        const newEmail = newEmailDetail
        const gettingUserCredentials = await User.findByIdAndUpdate(userId,{
            $set :{
                username: newUsername,
                email: newEmail,
                password: changePassword,
                image: `/uploadedImages/${uploadPicture}`
            }
        })
       
       
    
    res.redirect('/dashboard')
    }else{
        res.render('account-profile-setting', {error: 'Wrong Old Password Please Try Again', currentUser, username})
    }
    
    
}

const getProfilePicture = async(req, res)=>{
    const currentUser = req.user
    const username = req.user.username
    const profile = req.user.image
res.render('changeProfilePicture', {currentUser, username, profile})
}
const updateProfilePicture = async(req, res)=>{
    const username = req.user.username
    const userId = req.user._id
    const profilePicture = req.files.image
    const uploadPicture = profilePicture.name
    const movePicture = `./public/uploadedImages/${uploadPicture}`
    profilePicture.mv(movePicture)

    const currentUser= req.user

    
    // const changePassword = await User.findOneAndUpdate({password: oldPassword, update: bcrypt.hash(newPassword, 12)})
    if(profilePicture){ 
        const gettingUserCredentials = await User.findByIdAndUpdate(userId,{
            $set :{
                image: `/uploadedImages/${uploadPicture}`
            }
        })
       
       
    
    res.redirect('/dashboard')
    }else{
        res.render('changeProfilePicture', {error: 'Please Select Image File', currentUser, username})
    }
    
    
}

const postMessageToAdmin = async(req, res)=>{
    const name = req.body.name
    const email = req.body.email
    const subject = req.body.subject
    const message = req.body.message

    const mailgunAuth = {
        auth: {
            api_key: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN
        }
    }
const transporter = await nodemailer.createTransport(nodemailerMailGun(mailgunAuth))
const data = {
from: email ,
to: 'mernstackdeveloperz@gmail.com',
subject: subject,
text: `Hello My Name is ${name} and this is my message: ${message}`
}

transporter.sendMail(data, (err, body)=>{
if(err){
    console.log(err)
}

})
res.redirect('/')
}
// const forgotMyPassword = async(req, res)=>{
//     const email = req.body.email

//     const user = await User.findOne({email: email})
//     if(user){
//     }else{
//         res.render('forgot-password', {error: 'User email Not found Please Check again'})
//     }
//     const mailgunAuth = {
//         auth: {
//             api_key: process.env.MAILGUN_API_KEY,
//             domain: process.env.MAILGUN_DOMAIN
//         }
//     }
// const transporter = await nodemailer.createTransport(nodemailerMailGun(mailgunAuth))
// const data = {
// from: Nexus-plus-ads ,
// to: email,
// subject: 'your User password',
// text: `Hello My Name is ${name} and this is my message: ${message}`
// }

// transporter.sendMail(data, (err, body)=>{
// if(err){
//     console.log(err)
// }

// })
// res.redirect('/')
// }

const makeProductEnquiry = async(req, res)=>{
//     const name = req.body.name
//     const phone = req.body.phone
//     const emaill = req.user.email
//     const usernamee = req.user.username
// const productId = {product}
// // const find = await Post.findOne({_id: productId})
// console.log(productId)
//     const mailgunAuth = {
//         auth: {
//             api_key: process.env.MAILGUN_API_KEY,
//             domain: process.env.MAILGUN_DOMAIN
//         }
    // }
// const transporter = await nodemailer.createTransport(nodemailerMailGun(mailgunAuth))


// const titlee = find.adTitle
// const ownerMainId = find.ownerId
// const userIdDetail = await User.findOne({_id: ownerMainId})
// const ownerMail = userIdDetail.email
// console.log(find)
// const data = {
// from: emaill ,
// to: ownerMail,
// subject: `Purchase Of Your Product ID: ${productId}`,
// text: `Hello My Name is ${usernamee}, I'm interested in this product ${titlee} and I'd like to know more details, Call Me.`
// }

// transporter.sendMail(data, (err, body)=>{
// if(err){
//     console.log(err)
// }

// })
// res.redirect('/')
// alert('Message Sent Successfully')
}

const forgotPassword = (req, res)=>{
    res.render('forgot-password')
}


module.exports = { getHomePage,forgotPassword, postMessageToAdmin,makeProductEnquiry, getProfilePicture, updateProfilePicture, logOut,getAccountProfileSetting,changeUserDetails,deleteDashboardPosts,getaccountFavouriteAds,getWelcomePage, getAccountMyAds,getPaymentsPage, getOfferMessages, getAdListSection, getadListPage, getDashboardPage, getCategorySections,getAdgridSection, checkUsername, sendMessage, postAdvertsToDatabase, getadListDetailPage, getaboutPage, getServicesPage, getpostAdsPage, getPackagesPage, gettestimonialPage, getfaqPage, get404Page, getBlogRightSidePage, getBlogLeftSidePage, getBlogGridFullWidthPage, getBlogDetailsPage, getContactPage, getadGridPage,postSearchBox, authenticateLogin, getRegisterPage, getCategoriesPage, getLoginPage, getUserDetails, checkUserConfirmPassword }