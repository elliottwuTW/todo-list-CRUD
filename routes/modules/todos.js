const express = require('express')
const router = express.Router()

const Todo = require('../../models').Todo

router.get('/:id', (req, res) => {
  const id = req.params.id
  Todo.findByPk(id)
    .then((todo) => res.render('detail', { todo: todo.toJSON() }))
    .catch((err) => res.status(500).json(err))
})

module.exports = router
