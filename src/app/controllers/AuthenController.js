const Book = require('../models/Bookings')
const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const {mutipleMongooseToObject} = require('../../util/mongoose');
const { log } = require('handlebars');
const Users = require('../models/Users');
const bcrypt = require('bcrypt')
const user = []

class AuthenController {

  index(req, res, next){
    res.render('authen/login')
  }
  
  logout(req, res, next){
    res.clearCookie("token");
    res.redirect('/login')
  }

  async login(req, res, next) {
    var username = req.body.name
    var password = req.body.password
     User.findOne( 
      {
        name: username,
        password: password
      }).then( async data => 
        { 
          if (data) {
            var token = jwt.sign({data: data}, 'authen', { expiresIn: 60 * 60 })
            res.cookie('token', token, {expire: 60 + Date.now()})
            return res.redirect('/')
          } else {
            res.redirect('/login')
          }
        }
      ).catch(next)
   }

 async private(req, res, next) {
    try {
      var token = req.cookies.token
      var ischeck = jwt.verify(token, 'mk')
      await User.findOne(token.id).then( user => console.log(user))
      if (ischeck) {
        next()
      }
    } catch ( error ) {
      return res.riderect('authen/login')
    }
  }

  // async register(req, res, next){
  //   res.render('authen/register')
  // }

  // async regist(req, res, next){
  //   try {
  //     const hashedPassword = await bcrypt.hash(req.body.password, 10)
  //     user.push ({
  //       name : req.body.name,
  //       pass : hashedPassword
  //     })
  //     console.log(user);
  //     res.render('authen/login')
  //   } catch {
  //     res.render('authen/register')
  //   }
  // }
}

module.exports = new AuthenController;