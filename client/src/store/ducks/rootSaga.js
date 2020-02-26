import { all, put, takeLatest } from 'redux-saga/effects'

import ActionCreators, { Types } from '../actionCreators'

import {
  auth,
  createProfile,
  destroyAuth,
  login,
  updateProfile
} from './auth/sagas'

import {
  createHour,
  getHour,
  getHours,
  removeHour,
  updateHour
} from './hours/sagas'

import { getUser, getUsers, removeUser, updateUser } from './users/sagas'

// Export all sagas in one 'root' saga
export default function* rootSaga() {
  yield all([
    // Session saga
    takeLatest(Types.SIGNIN_REQUEST, login),
    takeLatest(Types.AUTH_REQUEST, auth),
    takeLatest(Types.DESTROY_AUTH_REQUEST, destroyAuth),
    // Hours saga
    takeLatest(Types.GET_HOURS_REQUEST, getHours),
    takeLatest(Types.GET_HOUR_REQUEST, getHour),
    takeLatest(Types.CREATE_HOUR_REQUEST, createHour),
    takeLatest(Types.UPDATE_HOUR_REQUEST, updateHour),
    takeLatest(Types.REMOVE_HOUR_REQUEST, removeHour),
    // User saga
    takeLatest(Types.GET_USERS_REQUEST, getUsers),
    takeLatest(Types.GET_USER_REQUEST, getUser),
    takeLatest(Types.CREATE_PROFILE_REQUEST, createProfile),
    takeLatest(Types.UPDATE_PROFILE_REQUEST, updateProfile),
    takeLatest(Types.UPDATE_USER_REQUEST, updateUser),
    takeLatest(Types.REMOVE_USER_REQUEST, removeUser),
    // Board saga

    put(ActionCreators.authRequest())
  ])
}
