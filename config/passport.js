const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook')

const User = require('../models').User
const bcrypt = require('bcryptjs')

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      (req, email, password, done) => {
        User.findOne({ where: { email } })
          .then((user) => {
            if (!user) {
              return done(null, false, req.flash('login_error', '使用者不存在'))
            }
            bcrypt.compare(password, user.password).then((isMatch) => {
              if (!isMatch) {
                return done(null, false, req.flash('login_error', '密碼錯誤'))
              }
              done(null, user)
            })
          })
          .catch((err) => console.error(err))
      }
    )
  )

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
      },
      function (accessToken, refreshToken, profile, done) {
        const { email, name } = profile._json

        User.findOne({ where: { email } })
          .then((user) => {
            if (user) {
              return done(null, user)
            }
            // 建立 user
            const randomPassword = Math.random().toString(36).slice(-8)
            bcrypt
              .genSalt(10)
              .then((salt) => bcrypt.hash(randomPassword, salt))
              .then((hash) =>
                User.create({
                  name,
                  email,
                  password: hash
                })
              )
              .then((user) => done(null, user))
              .catch((err) => console.error(err))
          })
          .catch((err) => console.error(err))
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then((user) => done(null, user.toJSON()))
      .catch((err) => console.error(err))
  })
}
