const newsRouter = require('./new')
const siteRouter = require('./site')
const meRouter = require('./me')
const booksRouter = require('./book')
const authenRouter = require('./authen')
function route(app) {
 app.use('/news', checkAuthenticated,  newsRouter)
 app.use('/me',  checkAuthenticated, meRouter)
 app.use('/books', checkAuthenticated,  booksRouter)
 app.use('/login', authenRouter)
 app.use('/',  checkAuthenticated, siteRouter)
}
function checkAuthenticated(req,res, next) {
    if(req.cookies.token){
     return next()
    }else{
     res.redirect('/login')
    }
   }
module.exports= route;