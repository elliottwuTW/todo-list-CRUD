const express = require('express')
const router = express.Router()

const User = require('../../models').User

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
  res.send('login')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  console.log('User: ', User)
  console.log('typeof User: ', typeof User)

  const user = req.body
  delete user.confirmPassword
  User.create(user).then((user) => res.redirect('/'))
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router
