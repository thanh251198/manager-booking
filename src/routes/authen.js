const express = require('express')
const router = express.Router()
const authenController = require('../app/controllers/AuthenController')

router.get('/', authenController.index)
router.get('/logout', authenController.logout)
router.post('/', authenController.login)
module.exports= router