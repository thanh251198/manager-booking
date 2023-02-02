const Book = require('../models/Bookings')
const {mutipleMongooseToObject} = require('../../util/mongoose')

class MeController {

 // get
 storedBook(req, res, next) {
  let bookQuery = Book.find().sortAble(req);
  Promise.all([ Book.countDocumentsDeleted(), bookQuery ] )
  .then( ([deletedBook, book ]) => 
   res.render('me/stored-book',
    {
     deletedBook,
     book : mutipleMongooseToObject(book),
    }
   )
  ).catch(next)
 }
 trash(req, res, next) {
  Book.findDeleted()
  .then(book => res.render('me/trash-book',
  {
   book : mutipleMongooseToObject(book)
  }
  ))
  .catch(next)
 }
}
module.exports = new MeController;