const router = require('express').Router()
const { addCoupan, list, single } = require('../controllers/coupanController')

router.post('/add', addCoupan)
router.get('/all',list)
router.get('/:id',single)

module.exports = router