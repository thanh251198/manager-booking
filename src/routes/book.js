const express = require('express')
const router = express.Router()
const bookController = require('../app/controllers/BookController')

router.get('/create', checkAuthenticated, bookController.create)
router.get('/:id/edit', bookController.edit)
router.post('/store', checkAuthenticated, bookController.store)
router.post('/handle-form-action', bookController.handleFormAction)
router.put('/:id', bookController.update)
router.patch('/:id/restore', bookController.restore)
router.delete('/:id', bookController.delete)
router.delete('/:id/force', bookController.destroy)
router.get('/:slug', checkAuthenticated, bookController.show)
// router.get('/', bookController.index)
function checkAuthenticated(req,res, next) {
    if(req.cookies.token){
     return next()
    }else{
     res.redirect('/login')
    }
   }
module.exports= router