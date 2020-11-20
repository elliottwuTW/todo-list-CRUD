const express = require('express')
const router = express.Router()

const Todo = require('../../models').Todo

router.get('/', (req, res) => {
  Todo.findAll({
    raw: true
  })
    .then((todos) => res.render('index', { todos }))
    .catch((err) => res.status(500).json(err))
})

module.exports = router
