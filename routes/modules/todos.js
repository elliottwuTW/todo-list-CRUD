const express = require('express')
const router = express.Router()

const Todo = require('../../models').Todo

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  Todo.create({ ...req.body, userId: req.user.id })
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Todo.findOne({ where: { id, userId: req.user.id } })
    .then((todo) => res.render('detail', { todo: todo.toJSON() }))
    .catch((err) => console.error(err))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  Todo.findOne({ where: { id, userId: req.user.id } })
    .then((todo) => res.render('edit', { todo: todo.toJSON() }))
    .catch((err) => console.error(err))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  req.body.isDone = req.body.isDone === 'on'
  Todo.update(
    { ...req.body },
    { returning: true, where: { id, userId: req.user.id } }
  )
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  Todo.destroy({ where: { id, userId: req.user.id } })
    .then(() => res.redirect('/'))
    .catch((err) => console.error(err))
})

module.exports = router
