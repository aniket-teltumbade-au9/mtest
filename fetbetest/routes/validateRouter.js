const { validate } = require('../controllers/validateController')

const router = require('express').Router()

router.post('/isvalid',validate)

module.exports = router