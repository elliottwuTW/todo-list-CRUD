const express = require('express')
const router = express.Router()

const Todo = require('../../models').Todo

router.get('/', (req, res) => {
  Todo.findAll({
    where: { userId: req.user.id },
    raw: true,
    nest: true
  })
    .then((todos) => res.render('index', { todos }))
    .catch((err) => console.error(err))
})

module.exports = router
