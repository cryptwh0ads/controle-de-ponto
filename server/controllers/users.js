const bcrypt = require('bcrypt')

const login = ({ db, jwt, jwtSecret }) => async (req, res) => {
  const users = await db('users')
    .select()
    .where('username', req.body.username)
  if (users.length === 1) {
    if (bcrypt.compareSync(req.body.passwd, users[0].passwd)) {
      const { id, name, username, role, absent, email_emp, ci } = users[0]
      const user = {
        id,
        ci,
        name,
        username,
        email_emp,
        role,
        absent
      }
      const token = jwt.sign(user, jwtSecret)
      res.send({ token })
    } else {
      res.send({ error: true, message: 'wrong credentials' })
    }
  } else {
    res.send({ error: true, message: 'wrong credentials' })
  }
}
const get = ({ db }) => async (req, res) => {
  const { user } = res.locals
  if (user.role === 'admin') {
    const users = await db('users').select()
    res.send(users)
  } else {
    const users = await db('users')
      .select()
      .where('username', user.username)
    res.send(users)
  }
}
const getMe = ({ db }) => async (req, res) => {
  const userDB = await db('users')
    .select()
    .where('id', res.locals.user.id)
  res.send(userDB[0])
}
const getOne = ({ db }) => async (req, res) => {
  const { user } = res.locals
  let id = req.params.id
  if (user.role === 'user' && id != user.id) {
    res.status(401)
    res.send({ error: true })
  } else {
    const userDB = await db('users')
      .select()
      .where('id', id)
    res.send(userDB[0])
  }
}
const remove = ({ db }) => async (req, res) => {
  const { user } = res.locals
  const { id } = req.params
  if (user.role === 'user' || (user.role === 'admin' && id == user.id)) {
    res.status(401)
    res.send({ error: true })
  } else {
    await db('users')
      .select()
      .where('id', id)
      .del()
    res.send({ success: true })
  }
}

const create = ({ db }) => async (req, res) => {
  const { user } = res.locals
  const newUser = req.body
  let hash = bcrypt.hashSync(newUser.passwd, 10)
  const userToInsert = {
    name: newUser.name,
    ci: newUser.ci,
    username: newUser.username,
    email_emp: newUser.email_emp,
    passwd: hash,
    absent: newUser.absent
  }
  // creating new account - without token
  if (!user) {
    userToInsert.role = 'user'
  } else if (user.role === 'user') {
    return res.send({
      error: true,
      message: 'only admins can create new users.'
    })
  } else {
    userToInsert.role = newUser.role
  }

  const usernameAlreadyExists = await db('users')
    .select(db.raw('count(*) as total'))
    .where('username', newUser.username)
  if (usernameAlreadyExists[0].total > 0) {
    return res.send({ error: true, message: 'Username already taken.' })
  }

  await db.insert(userToInsert).into('users')
  res.send(userToInsert)
}

const update = ({ db }) => async (req, res) => {
  const { user } = res.locals
  const updatedUser = req.body
  let { id } = req.params
  const userToUpdate = {}
  const fields = [
    'name',
    'role',
    'username',
    'passwd',
    'absent',
    'email_emp',
    'ci'
  ]
  fields.forEach(field => {
    if (updatedUser[field]) {
      if (updatedUser.passwd) {
        let hash = bcrypt.hashSync(updatedUser.passwd, 10)
        userToUpdate[field] = hash
      } else {
        userToUpdate[field] = updatedUser[field]
      }
    }
  })
  if (user.role === 'user') {
    userToUpdate['role'] = 'user'
  }
  // creating new account - without token
  if (user.role === 'user' && user.id != id) {
    return res.send({
      error: true,
      message: 'only admins can update any user.'
    })
  }
  await db('users')
    .where('id', id)
    .update(userToUpdate)

  res.send(userToUpdate)
}

module.exports = {
  login,
  get,
  getMe,
  getOne,
  remove,
  create,
  update
}
