const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const session = require('express-session')

const routes = require('./routes/index')
const usePassport = require('./config/passport')

const app = express()
const PORT = 3000

app.engine('hbs', exphbs({ defaultLayout: 'layout', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.use(
  session({
    secret: 'ThisIsSecret',
    resave: false,
    saveUninitialized: true
  })
)

usePassport(app)

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
