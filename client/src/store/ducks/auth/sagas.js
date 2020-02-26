import { put } from 'redux-saga/effects'

import axios from 'axios'
import jwtDecode from 'jwt-decode'

import ActionCreators from '../../actionCreators'

import { baseURL } from '../../../config/index'

export function* login(action) {
  let token = localStorage.getItem('token')
  const login = yield axios.post(`${baseURL}/users/login`, {
    username: action.username,
    passwd: action.passwd
  })
  if (login.data.token) {
    // Extract token to response
    token = login.data.token
    // Save user logged token in local storage
    localStorage.setItem('token', token)

    const user = jwtDecode(token)
    localStorage.setItem('user', user)
    yield put(ActionCreators.signinSuccess(user))
  } else {
    yield put(ActionCreators.signinFailure(login.data.message))
  }
}

export function* auth() {
  const token = localStorage.getItem('token')
  if (token) {
    try {
      // const user = jwtDecode(token);
      const user = yield axios.get(`${baseURL}/users/me`, {
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      yield put(ActionCreators.authSuccess(user.data))
    } catch (err) {
      yield put(ActionCreators.authFailure('invalid token'))
    }
  } else {
    yield put(ActionCreators.authFailure('no token'))
  }
}

export function* updateProfile(action) {
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

  yield put(ActionCreators.updateProfileSuccess(userToSave))
}

export function* createProfile(action) {
  const userToSave = {
    ...action.user
  }
  // eslint-disable-next-line no-unused-vars
  const user = yield axios.post(`${baseURL}/users/`, userToSave)
  yield put(ActionCreators.createProfileSuccess(userToSave))
}

export function* destroyAuth() {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  yield put(ActionCreators.destroyAuthSuccess())
}
