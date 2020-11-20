module.exports = (req, res, next) => {
  const name = req.body.name || ''
  const { email, password, confirmPassword } = req.body

  const registerErrors = []
  // check email
  if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
    registerErrors.push({ msg: '不允許的 email' })
  }
  // check password
  if (password.length < 8) {
    registerErrors.push({ msg: '密碼長度最少 8 個字元' })
  }
  if (password !== confirmPassword) {
    registerErrors.push({ msg: '請確認密碼' })
  }

  if (registerErrors.length > 0) {
    return res.render('register', { name, email, registerErrors })
  } else {
    next()
  }
}
