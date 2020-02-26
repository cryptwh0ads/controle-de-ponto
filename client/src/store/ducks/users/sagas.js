import axios from 'axios'
import { put } from 'redux-saga/effects'

import ActionCreators from '../../actionCreators'

import { baseURL } from '../../../config/index'

export function* getUser(action) {
  const token = localStorage.getItem('token')
  const user = yield axios.get(`${baseURL}/users/${action.id}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  yield put(ActionCreators.getUserSuccess(user.data))
}

export function* getUsers(action) {
  const token = localStorage.getItem('token')

  const users = yield axios.get(`${baseURL}/users`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })

  yield put(ActionCreators.getUsersSuccess(users.data))
}
export function* removeUser(action) {
  const token = localStorage.getItem('token')
  yield axios.delete(`${baseURL}/users/${action.id}`, {
    headers: {
      Authorization: 'Bearer ' + token
    }
  })
  yield put(ActionCreators.removeUserSuccess(action.id))
}

export function* updateUser(action) {
  const token = localStorage.getItem('token')
  const userToSave = {
    ...action.user
  }
  // eslint-disable-next-line no-unused-vars
  const user = yield axios.patch(
    `${baseURL}/users/${action.user.id}`,
    userToSave,
    {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }
  )

  yield put(ActionCreators.updateUserSuccess(userToSave))
}
