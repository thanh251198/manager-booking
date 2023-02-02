const express = require('express')
const router = express.Router()
const SiteController = require('../app/controllers/SiteController')
// newsController
// router.get('/search', checkAuthenticated, SiteController.search)
// router.get('/login', checkAuthenticated, SiteController.login)
// router.get('/register', checkAuthenticated, SiteController.register)
// router.post('/logins',checkAuthenticated,  SiteController.logins)
// router.get('/private',checkAuthenticated,  SiteController.private)
router.get('/', checkAuthenticated, SiteController.index)

function checkAuthenticated(req,res, next) {
 if(req.cookies.token){
  return next()
 }else{
  res.redirect('/login')
 }
}
module.exports= router