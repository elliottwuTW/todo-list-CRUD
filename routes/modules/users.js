const express = require('express')
const router = express.Router()

const bcrypt = require('bcryptjs')
const passport = require('passport')

const User = require('../../models').User

const checkRegisterInfo = require('../../middleware/checkRegisterInfo')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', checkRegisterInfo, (req, res) => {
  const { name, email, password } = req.body

  User.findOne({ where: { email } }).then((user) => {
    // 已註冊
    if (user) {
      return res.render('register', {
        name,
        email,
        registerErrors: [{ msg: 'email 已經被註冊!' }]
      })
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
      .then(() => res.redirect('/uers/login'))
      .catch((err) => console.error(err))
  })
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('logout_success', '登出成功')
  res.redirect('/users/login')
})

module.exports = router
