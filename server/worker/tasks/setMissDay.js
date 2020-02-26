var axios = require('axios')
var moment = require('moment')

const baseURL = 'http://localhost:3001'

const setMissDay = async () => {
  const { data } = await axios.post(`${baseURL}/users/login`, {
    username: 'admin',
    passwd: '123456'
  })

  const users = await axios.get(`${baseURL}/users/`, {
    headers: {
      Authorization: 'Bearer ' + data.token
    }
  })
  users.data.forEach(user => {
    if (user.absent === '1') {
      if (new Date().getDay() === 6 || new Date().getDay() === 0) {
        axios.post(
          `${baseURL}/hours`,
          {
            date: moment().toJSON(),
            id_user: user.id,
            entrance_1: 'FIM DE SEMANA',
            exit_1: 'FIM DE SEMANA',
            entrance_2: 'FIM DE SEMANA',
            exit_2: 'FIM DE SEMANA'
          },
          {
            headers: {
              Authorization: 'Bearer ' + data.token
            }
          }
        )
      } else {
        axios.post(
          `${baseURL}/hours`,
          {
            date: moment().toJSON(),
            id_user: user.id,
            entrance_1: 'FALTA',
            exit_1: 'FALTA',
            entrance_2: 'FALTA',
            exit_2: 'FALTA',
            worked: '00:00',
            miss: new Date().getDay() === 5 ? '08:00' : '09:00',
            extra: '00:00'
          },
          {
            headers: {
              Authorization: 'Bearer ' + data.token
            }
          }
        )
      }
    }
  })
}

setMissDay()

module.exports = setMissDay
