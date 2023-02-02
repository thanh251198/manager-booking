const Book = require('../models/Bookings')
const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const {mutipleMongooseToObject} = require('../../util/mongoose');
const { log } = require('handlebars');
const Rooms = require('../models/Rooms');
const bcrypt = require('bcrypt')
// const initializePassport = require('./passport-config')
const user = []

class SiteController {
 // get
 index(req, res, next) {
  Rooms.find({}).then(rooms => {
   res.render('home', {books: mutipleMongooseToObject(rooms)})
  }
   )
  .catch(next);
 }

//  search(req, res) {
//   res.render('search')
//  }
//  login(req, res, next){
//     User.find({}).then(user => 
//       {
//         res.render('authen/login')
//       }
//       )
//       .catch(next);
//   }
//   async logins(req, res, next) {
//     const user = []
//     var username = req.body.name
//     var password = req.body.password
//     user.push({
//       name: req.body.name,
//       password: req.body.password
//     })
//     console.log(user);
//      User.findOne( 
//       {
//         name: username,
//         password: password
//       }).then( async data => 
//         { 
//           if (data) {
//             var token = jwt.sign({_id: data._id}, 'mk')
//             res.cookie('token', token, {expire: 60 + Date.now()})
//             console.log("Cookies.get('token') :", token );
//             return res.redirect('/')
//           } else {
//             // console.log("k có data");
//             // res.render('authen/login')
//           }
//           console.log("user: ", data)
//         }
//       ).catch(next)
//    }
}

module.exports = new SiteController;