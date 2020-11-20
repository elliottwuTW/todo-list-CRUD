const express = require('express')
const router = express.Router()

const users = require('./modules/users')
const todos = require('./modules/todos')
const home = require('./modules/home')

const auth = require('../middleware/auth')
const fbAuth = require('./modules/fbAuth')

router.use('/auth/facebook', fbAuth)
router.use('/users', users)
router.use('/todos', auth, todos)
router.use('/', auth, home)

module.exports = router
