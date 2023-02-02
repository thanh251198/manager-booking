const express = require('express')
const router = express.Router()
const meController = require('../app/controllers/MeController')

router.get('/stored/books', meController.storedBook)
router.get('/trash/books', meController.trash)

module.exports= router