const router = require('express').Router()

const users = require('./users')
const hours = require('./hours')

router.get('/', (req, res) => res.send(`It's working!!!`))
router.use('/users', users)
router.use('/hours', hours)

module.exports = router
