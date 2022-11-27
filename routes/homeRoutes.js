const express = require('express')
const routes = express.Router()
const{getHomePage, checkUserConfirmPassword,getWelcomePage,homeProducts,makeProductEnquiry,changeUserDetails, getOfferMessages,getPaymentsPage, postSearchBox,getaccountFavouriteAds,getAccountProfileSetting , getAccountMyAds,getDashboardPage, sendMessage,getAdListSection,getCategorySections,getAdgridSection, getadGridPage,logOut, checkUsername, authenticateLogin, getCategoriesPage, postAdvertsToDatabase, getUserDetails, getRegisterPage, getLoginPage,getadListPage,getadListDetailPage, getaboutPage,getServicesPage,getpostAdsPage,getPackagesPage,deleteDashboardPosts,gettestimonialPage,getfaqPage,get404Page,getBlogRightSidePage,getBlogLeftSidePage,getBlogGridFullWidthPage,getBlogDetailsPage,getContactPage,postMessageToAdmin} = require('../controllers/homeControllers')
// const  setUser = require('../middlewares/setUser')
const User = require('../models/User-Registration Model')
const Post = require('../models/postAdsModel')
const setUser = require('../middlewares/setUser')


routes.get('/', setUser, getHomePage)
routes.get('/welcome', getWelcomePage)
routes.get('/register', getRegisterPage)
routes.get('/login', getLoginPage)
routes.get('/category', setUser, getCategoriesPage)
routes.get('/adgrid', setUser, getadGridPage)
routes.get('/adlistinglist',setUser, getadListPage )
// routes.get('/ads-Listingdetails',setUser, getadListDetailPage )
routes.get('/about',setUser, getaboutPage )
routes.get('/services',setUser, getServicesPage )
routes.get('/ads-details/:id',setUser, getadListDetailPage )
routes.get('/dashboard', setUser, getDashboardPage)
// routes.get('/account-myads', setUser, getAccountMyAds)
// routes.get('/offermessages', setUser, getOfferMessages)
// routes.get('/payments', setUser, getPaymentsPage)
// routes.get('/account-favourite-ads', setUser, getaccountFavouriteAds)
routes.get('/account-profile-setting', setUser, getAccountProfileSetting )

//had to use just the id entering to redirect to this route
//it seems any route that has more than the /home/post-ads
//wil not work
routes.get('/post-ads',setUser, getpostAdsPage)



// routes.get('/pricing',setUser, getPackagesPage )
routes.get('/testimonial',setUser, gettestimonialPage )
routes.get('/faq',setUser, getfaqPage )
// routes.get('/404', setUser, get404Page )
// routes.get('/blog',setUser, getBlogRightSidePage )
// routes.get('/blog-left-sidebar',setUser, getBlogLeftSidePage )
// routes.get('/blog-grid-full-width',setUser, getBlogGridFullWidthPage )
// routes.get('/single-post',setUser, getBlogDetailsPage )
routes.get('/contact',setUser, getContactPage )
routes.get('/deletePost/:id',deleteDashboardPosts)
routes.get('/logout', logOut)

// dynamic Get REQUESTS
routes.get('/category/:category', setUser, getCategorySections)
routes.get('/adListingList/:category', setUser, getAdListSection)
routes.get('/adgrid/:category', setUser, getAdgridSection)


routes.post('/register', checkUsername, checkUserConfirmPassword, getUserDetails)
routes.post('/', authenticateLogin)
routes.post('/postAds', setUser, postAdvertsToDatabase )
routes.post('/search', setUser, postSearchBox)
routes.post('/updateProfile', setUser, changeUserDetails)
routes.post('/contact', setUser, postMessageToAdmin)
routes.post('/makeProductEnquiry', makeProductEnquiry)


routes.post('/wannaPurchase', sendMessage )


module.exports = routes