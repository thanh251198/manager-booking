const express = require('express')
const router = express.Router()
const authenController = require('../app/controllers/AuthenController')
// newsController
router.get('/', authenController.index)
router.post('/', authenController.login)
module.exports= router