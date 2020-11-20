const express = require('express')
const router = express.Router()

const passport = require('passport')

router.get(
  '/',
  passport.authenticate('facebook', {
    scope: ['email', 'public_profile']
  })
)

router.get(
  '/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/users/login'
  })
)

module.exports = router
