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
}

module.exports = new SiteController;