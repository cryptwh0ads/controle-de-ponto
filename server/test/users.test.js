var before = require('mocha').before
var request = require('supertest'),
  app = require('../app')

describe('Testing Authorization In User Endpoint', () => {
  var token = null
  // Get token to future tests
  before(done => {
    request(app)
      .post('/users/login')
      .send({ username: 'admin', passwd: '123456' })
      .end((err, res) => {
        token = res.body.token
        done()
      })
  })

  // Routes are working
  it('It`s working', done => {
    request(app)
      .get('/')
      .expect(200)
      .expect(/It's working/, done)
  })
  // User login with successful
  it('Should get new token authentication', done => {
    request(app)
      .post('/users/login')
      .send({ username: 'admin', passwd: '123456' })
      .expect(200)
      .expect(/token/, done)
  })
  // it should register new user
  it('Should create new user', done => {
    request(app)
      .post('/users')
      .send({ name: 'Test', username: 'test', passwd: 'test123' })
      .expect(200, done)
  })
  // it should delete users
  it('Should remove user (admin only)', done => {
    request(app)
      .delete('/users/2')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, done)
  })
  // it should get a list of all users
  it('Should get users list (admin only)', done => {
    request(app)
      .get('/users')
      .set('Authorization', 'Bearer ' + token)
      .expect(200, done)
  })
})

describe('Testing Unauthorized In User Endpoint', () => {
  // User's role don't get users list
  it("User shouldn't get users list", done => {
    request(app)
      .get('/users')
      .send({ role: 'user' })
      .expect(401, done)
  })
  // User's role don't remove another users
  it("User shouldn't remove another user", done => {
    request(app)
      .delete('/users/2')
      .send({ id: 2 })
      .expect(401, done)
  })
})

describe('Testing Errors In User Endpoint', () => {
  // Show a message if users already exists on register
  it('Username already exists', done => {
    request(app)
      .post('/users')
      .send({ name: 'Test', username: 'test', passwd: 'test123' })
      .expect(200)

    request(app)
      .post('/users')
      .send({ name: 'Test', username: 'test', passwd: 'test123' })
      .expect(200)
      .expect(/Username already taken/, done)
  })

  it('Wrong credentials (password blank)', done => {
    request(app)
      .post('/users/login')
      .send({ username: 'admin', passwd: '' })
      .expect(200)
      .expect(/wrong credentials/, done)
  })

  it("Wrong credentials (user/pass don't match)", done => {
    request(app)
      .post('/users')
      .send({ name: 'Test', username: 'test', passwd: 'test123' })
      .expect(200)

    request(app)
      .post('/users/login')
      .send({ username: 'test', passwd: '' })
      .expect(200)
      .expect(/wrong credentials/, done)
  })
})
