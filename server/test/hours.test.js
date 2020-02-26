var before = require('mocha').before
var request = require('supertest'),
  app = require('../app')

describe('Testing Authorization In Hour Endpoint', () => {
  var token = null
  var hours = []
  let id = 0
  // Get token to future tests
  before(done => {
    request(app)
      .post('/users/login')
      .send({ username: 'admin', passwd: '123456', role: 'admin' })
      .expect(200)
      .end((err, res) => {
        token = res.body.token
        done()
      })
  })
  // it should register new user
  it('Should register entrance', done => {
    request(app)
      .post('/hours/')
      .set('Authorization', 'Bearer ' + token)
      .send({ date: '01/01/2020', entrance_1: '08:00' })
      .expect(200, done)
  })

  it('Get hours', done => {
    request(app)
      .get('/hours')
      .set('Authorization', 'Bearer ' + token)
      .end((err, res) => {
        hours = res.body
        id = hours.data[0].id
        done()
      })
  })

  // it should get a list of all users
  it('Should get hours list (admin only)', done => {
    request(app)
      .get('/hours')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, done)
  })
  // it should delete users
  it('Should remove hour (admin only)', done => {
    request(app)
      .delete(`/hours/${id}`)
      .set('Authorization', 'Bearer ' + token)
      .expect(200, done)
  })
})

describe('Testing Unauthorized In Hour Endpoint', () => {
  // User's role don't get hours list
  it("User shouldn't get hours list", done => {
    request(app)
      .get('/hours')
      .send({ role: 'user' })
      .expect(401, done)
  })
  // User's role don't get the hour from another user
  it("User shouldn't get hours list", done => {
    request(app)
      .get('/hours/2')
      .send({ user_id: '1' })
      .expect(401, done)
  })
  // User's role don't remove a hour
  it("User shouldn't remove a hour", done => {
    request(app)
      .delete('/hours/2')
      .send({ id: 2 })
      .expect(401, done)
  })
})

describe('Testing Errors In Hour Endpoint', () => {
  it('No error test for this route', done => {
    request(app)
      .get('/')
      .expect(200, done)
  })
})
