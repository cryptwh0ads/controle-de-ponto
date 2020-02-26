const { connDev, connProd } = require('./config/index')
const bcrypt = require('bcrypt')
const knex = require('knex')(connDev)

const initDB = async () => {
  const usersExist = await knex.schema.hasTable('users')

  if (!usersExist) {
    await knex.schema.createTable('users', table => {
      table.increments('id').primary()
      table.integer('ci')
      table.string('name')
      table.string('username')
      table.string('email_emp')
      table.string('passwd')
      table.string('role')
      table.string('absent')
    })
  }

  const hoursExist = await knex.schema.hasTable('hours')

  if (!hoursExist) {
    await knex.schema.createTable('hours', table => {
      table.increments('id').primary()
      table.integer('user_id')
      table.string('date')
      table.string('entrance_1')
      table.string('exit_1')
      table.string('entrance_2')
      table.string('exit_2')
      table.string('worked')
      table.string('miss')
      table.string('extra')
    })
  }

  let hash = bcrypt.hashSync('123456', 10)

  const totalUsers = await knex('users').select(knex.raw('count(*) as total'))

  if (totalUsers[0].total === 0) {
    await knex
      .insert({
        name: 'Admin',
        ci: 1,
        email_emp: 'admin@mrseditorial.com',
        username: 'admin',
        passwd: hash,
        role: 'admin',
        absent: '1'
      })
      .into('users')
    await knex
      .insert({
        name: 'User',
        ci: 2,
        username: 'user',
        email_emp: 'user@mrseditorial.com',
        passwd: hash,
        role: 'user',
        absent: '1'
      })
      .into('users')
  }
}
initDB()

module.exports = knex
