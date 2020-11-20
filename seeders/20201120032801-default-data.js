'use strict'

const bcrypt = require('bcryptjs')
const SEED_USER = {
  name: 'root',
  email: 'root@example.com',
  password: '12345678'
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // 建立 User
    const userId = await queryInterface.bulkInsert('Users', [
      { ...SEED_USER, createdAt: new Date(), updatedAt: new Date() }
    ])

    // 建立 Todo
    const todoArray = Array.from({ length: 10 }).map((_, index) => ({
      name: `name-${index}`,
      userId,
      createdAt: new Date(),
      updatedAt: new Date()
    }))
    await queryInterface.bulkInsert('Todos', todoArray)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null)
    await queryInterface.bulkDelete('Todos', null)
  }
}
