const Book = require('../models/Bookings')
const Room = require('../models/Rooms')
const jwt = require('jsonwebtoken')
const User = require('../models/Users')
const {mongooseToObject} = require('../../util/mongoose');
const { log } = require('handlebars');

class BookController {

 // get
 create(req, res, next) {
  res.render('books/create'); 
 
 }

 store(req, res, next) {
  const formData = {...req.body};
  formData.image ='https://images.pexels.com/photos/699466/pexels-photo-699466.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  // console.log(req.body)
  const book = new Book(formData);
  book.save()
   .then(() => res.redirect('/me/stored/books'))
   .catch()
  ;
 }

 async edit(req, res, next) {
  try {
    var token = req.cookies.token
    var ischeck = jwt.verify(token, 'authen')
    if (ischeck.data.role == "admin") {
      Book.findById( req.params.id)
    .then(book =>  res.render('books/update',{book:mongooseToObject(book)}))
    .catch(next)
    }else {
      res.send({
        message:" Bạn không có quyền sửa thông tin trên"
      })
    }
  } catch ( error ) {
    return  res.send(error)
  }
}
//put
update(req, res, next) {
 Book.updateOne({_id: req.params.id}, req.body)
 .then( res.redirect('/me/stored/books'))
 .catch(next)
}

handleFormAction(req, res, next) {
  switch (req.body.action) {
    case 'delete':
      Book.delete({_id:{$in:req.body.booksId} })
      .then( res.redirect('/me/stored/books'))
      .catch(next)
      break;
  
    default:
      res.json({message:"Action is invalid"})
      break;
  }
 }

delete(req, res, next) {
  try {
    var token = req.cookies.token
    var ischeck = jwt.verify(token, 'authen')
    if (ischeck.data.role == "admin") {
     Book.delete({_id: req.params.id})
    .then( res.redirect('back'))
    .catch(next)
    }else {
      res.send({
        message:" Bạn không có quyền sửa thông tin trên"
      })
    }
  } catch ( error ) {
    return  res.send(error)
  }
}

restore(req, res, next) {
  try {
    var token = req.cookies.token
    var ischeck = jwt.verify(token, 'authen')
    if (ischeck.data.role == "admin") {

      Book.restore({_id: req.params.id})
    .then( res.redirect('back'))
    .catch(next)

    }else {
      res.send({
        message:" Bạn không có quyền sửa thông tin trên"
      })
    }
  } catch ( error ) {
    return  res.send(error)
  }
  // Book.restore({_id: req.params.id})
  // .then( res.redirect('back'))
  // .catch(next)
 }
 destroy(req, res, next) {
  try {
    var token = req.cookies.token
    var ischeck = jwt.verify(token, 'authen')
    if (ischeck.data.role == "admin") {

      Book.deleteOne({_id: req.params.id})
      .then( res.redirect('back'))
      .catch(next)

    }else {
      res.send({
        message:" Bạn không có quyền sửa thông tin trên"
      })
    }
  } catch ( error ) {
    return  res.send(error)
  }
  // Book.delete({_id: req.params.id})
  // .then( res.redirect('back'))
  // .catch(next)
  
 }
 show(req, res, next) {
  // res.send("a" + req.params.slug)
  Room.findOne({slug: req.params.slug})
  .then(rooms =>  res.render('books/show', {book: mongooseToObject(rooms)}))
   .catch(next);
 }
}
module.exports = new BookController;