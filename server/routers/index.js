const express = require('express')
const router = express.Router()
const usersRouter = require('./usersRouter')
const adminRouter = require('./adminRouter')

router.use('/users', usersRouter)
router.use('/admins', adminRouter)

module.exports = router