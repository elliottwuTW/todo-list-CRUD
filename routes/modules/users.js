const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')

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
  const { name, email, password, confirmPassword } = req.body

  User.findOne({ where: { email } }).then((user) => {
    // 已註冊
    if (user) {
      return res.render('register', { name, email })
    }
    // 建立使用者
    bcrypt
      .genSalt(10)
      .then((salt) => bcrypt.hash(password, salt))
      .then((hash) =>
        User.create({
          name,
          email,
          password: hash
        })
      )
      .then(() => res.redirect('/'))
      .catch((err) => console.error(err))
  })

  const user = req.body
  delete user.confirmPassword
  User.create(user).then((user) => res.redirect('/'))
})

router.get('/logout', (req, res) => {
  res.send('logout')
})

module.exports = router
