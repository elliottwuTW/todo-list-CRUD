const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const session = require('express-session')

const routes = require('./routes/index')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
const dotenv = require('dotenv')

const app = express()

// env var
if (process.env.NODE_ENV !== 'production') {
  dotenv.config()
}

app.engine('hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  })
)
usePassport(app)

app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.access_warning = req.flash('access_warning')
  res.locals.login_error = req.flash('login_error')
  res.locals.logout_success = req.flash('logout_success')
  next()
})

app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`)
})
