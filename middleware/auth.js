module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash('access_warning', '請先登入')
    return res.redirect('/users/login')
  }
  next()
}
