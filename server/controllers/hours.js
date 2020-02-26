var moment = require('moment')

const get = ({ db }) => async (req, res) => {
  var currMonth = '0' + req.query.page
  var currYear = moment().format('YYYY')
  if (req.query.page - 1 === 0) {
    var prevMonth = '0' + 12
    var prevYear = currYear - 1
  } else {
    var prevMonth = '0' + (req.query.page - 1)
    var prevYear = currYear
  }
  const { user } = res.locals
  if (user.role === 'admin' && req.query.admin) {
    const hours = await db
      .select({
        id: 'hours.id',
        date: 'hours.date',
        entrance_1: 'hours.entrance_1',
        exit_1: 'hours.exit_1',
        entrance_2: 'hours.entrance_2',
        exit_2: 'hours.exit_2',
        worked: 'hours.worked',
        extra: 'hours.extra',
        miss: 'hours.miss',
        name: 'users.name',
        username: 'users.username'
      })
      .from('hours')
      .where('date', '>=', `${prevYear}-${prevMonth.substr(-2)}-26T00:00:00Z`)
      .where('date', '<=', `${currYear}-${currMonth.substr(-2)}-26T00:00:00Z`)
      .leftJoin('users', 'users.id', 'hours.user_id')
    res.send({
      data: hours,
      pagination: {
        message: 'soon :)'
      }
    })
  } else if (user.role === 'admin' && req.query.user_id) {
    const hours = await db
      .select('* ')
      .from('hours')
      .where('date', '>=', `${prevYear}-${prevMonth.substr(-2)}-26T00:00:00Z`)
      .where('date', '<=', `${currYear}-${currMonth.substr(-2)}-26T00:00:00Z`)
      .where('user_id', req.query.user_id)

    const users = await db.select('*').from('users')

    const currentUser = await db
      .select('*')
      .from('users')
      .where('id', req.query.user_id)
    res.send({
      data: hours,
      users: {
        data: users
      },
      currentUser: {
        data: currentUser
      }
    })
  } else {
    const hours = await db
      .select('*')
      .from('hours')
      .where('date', '>=', `${prevYear}-${prevMonth.substr(-2)}-26T00:00:00Z`)
      .where('date', '<=', `${currYear}-${currMonth.substr(-2)}-26T00:00:00Z`)

      .where('user_id', user.id)
    res.send({
      data: hours
    })
  }
}

const getOne = ({ db }) => async (req, res) => {
  const { user } = res.locals
  let id = req.params.id
  const hour = await db('hours')
    .select()
    .where('id', id)
  if (
    hour.length === 0 ||
    (user.role === 'user' && hour[0].user_id !== user.id)
  ) {
    res.status(401)
    return res.send({ error: true })
  }
  res.send(hour[0])
}
const remove = ({ db }) => async (req, res) => {
  const { user } = res.locals
  const { id } = req.params
  const hour = await db('hours')
    .select()
    .where('id', id)
  if (
    hour.length === 0 ||
    (user.role === 'user' && hour[0].user_id !== user.id)
  ) {
    res.status(401)
    res.send({ error: true })
  } else {
    await db('hours')
      .select()
      .where('id', id)
      .del()
    res.send({ success: true })
  }
}
const create = ({ db }) => async (req, res) => {
  const { user } = res.locals
  const newHour = req.body
  /* console.log(newHour.id_user)
  console.log(user.id) */
  const hourToInsert = {
    date: newHour.date,
    entrance_1: newHour.entrance_1,
    exit_1: newHour.exit_1,
    entrance_2: newHour.entrance_2,
    exit_2: newHour.exit_2,
    worked: newHour.worked,
    extra: newHour.extra,
    miss: newHour.miss,
    user_id: newHour.id_user !== undefined ? newHour.id_user : user.id
  }

  await db.insert(hourToInsert).into('hours')
  res.send(hourToInsert)
}

const update = ({ db }) => async (req, res) => {
  const { user } = res.locals
  const updatedHour = req.body
  let { id } = req.params

  const hour = await db('hours')
    .select()
    .where('id', id)
  if (
    hour.length === 0 ||
    (user.role === 'user' && hour[0].user_id !== user.id)
  ) {
    res.status(401)
    return res.send({ error: true })
  }

  const hourToUpdate = {
    entrance_1: updatedHour.entrance_1,
    exit_1: updatedHour.exit_1,
    entrance_2: updatedHour.entrance_2,
    exit_2: updatedHour.exit_2,
    worked: updatedHour.worked,
    extra: updatedHour.extra,
    miss: updatedHour.miss
  }

  await db('hours')
    .where('id', id)
    .update(hourToUpdate)

  res.send(hourToUpdate)
}

module.exports = {
  get,
  getOne,
  remove,
  create,
  update
}
