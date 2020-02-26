import axios from 'axios'
import { put } from 'redux-saga/effects'

import ActionCreators from '../../actionCreators'

import { baseURL } from '../../../config/index'

export function* getHour(action) {
  const token = localStorage.getItem('token')
  const hour = yield axios.get(`${baseURL}/hours/${action.id}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  yield put(ActionCreators.getHourSuccess(hour.data))
}

export function* getHours(action) {
  const token = localStorage.getItem('token')
  let filter = ''
  if (action.admin) {
    filter = `&admin=true`
  }
  if (action.userID) {
    filter = `&user_id=${action.userID}`
  }
  const hours = yield axios.get(
    `${baseURL}/hours?page=${action.page}${filter}`,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )
  if (hours.data.currentUser && hours.data.users) {
    yield put(
      ActionCreators.getHoursSuccess(
        hours.data.data,
        hours.data.users.data,
        hours.data.currentUser.data
      )
    )
  } else if (hours.data.users) {
    yield put(
      ActionCreators.getHoursSuccess(hours.data.data, hours.data.users.data)
    )
  } else {
    yield put(ActionCreators.getHoursSuccess(hours.data.data))
  }
}
export function* createHour(action) {
  const token = localStorage.getItem('token')
  // eslint-disable-next-line no-unused-vars
  const hours = yield axios.post(`${baseURL}/hours`, action.hour, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  //   yield put(ActionCreators.getHoursSuccess(hours.data));
}

export function* updateHour(action) {
  const token = localStorage.getItem('token')
  const hourToSave = {
    ...action.hour
  }
  // eslint-disable-next-line no-unused-vars
  const hours = yield axios.patch(
    `${baseURL}/hours/${action.hour.id}`,
    hourToSave,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )
  yield put(ActionCreators.updateHourSuccess(hourToSave))
}

export function* removeHour(action) {
  const token = localStorage.getItem('token')
  yield axios.delete(`${baseURL}/hours/${action.id}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  yield put(ActionCreators.removeHourSuccess(action.id))
}
