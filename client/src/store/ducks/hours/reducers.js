import { createReducer } from 'reduxsauce'
import { Types } from '../../actionCreators'

export const INITIAL_STATE = {
  isLoading: false,
  saved: false,
  disabled: false,
  data: [],
  users: {},
  currentUser: {}
}

export const getHoursRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
    disabled: false
  }
}

export const getHoursSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    data: action.hours,
    users: action.users,
    disabled: true,
    currentUser: action.currentUser
  }
}
export const getHoursFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    disabled: false
  }
}

export const getHourRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
    saved: false
  }
}

export const getHourSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    hour: action.hour,
    saved: false
  }
}
export const getHourFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false
  }
}

export const updateHourReset = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    saved: false,
    hour: []
  }
}

export const updateHourRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: true,
    saved: false
  }
}

export const updateHourSuccess = (state = INITIAL_STATE, action) => {
  const newHour = {
    ...state.data
  }
  return {
    ...state,
    isLoading: false,
    saved: true,
    data: newHour
  }
}

export const updateHourFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isLoading: false,
    saved: false
  }
}

export const removeHourRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSaving: true
  }
}

export const removeHourSuccess = (state = INITIAL_STATE, action) => {
  const hours = [...state.data]
  const id = action.id
  const indexToDelete = hours.findIndex(hour => hour.id === id)
  hours.splice(indexToDelete, 1)
  return {
    ...state,
    isSaving: false,
    data: hours
  }
}
export const removeHourFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSaving: false
  }
}

export const createHourRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    saved: true
  }
}

export const HANDLERS = {
  [Types.CREATE_HOUR_REQUEST]: createHourRequest,

  [Types.GET_HOURS_REQUEST]: getHoursRequest,
  [Types.GET_HOURS_SUCCESS]: getHoursSuccess,
  [Types.GET_HOURS_FAILURE]: getHoursFailure,

  [Types.UPDATE_HOUR_RESET]: updateHourReset,
  [Types.UPDATE_HOUR_REQUEST]: updateHourRequest,
  [Types.UPDATE_HOUR_SUCCESS]: updateHourSuccess,
  [Types.UPDATE_HOUR_FAILURE]: updateHourFailure,

  [Types.GET_HOUR_REQUEST]: getHourRequest,
  [Types.GET_HOUR_SUCCESS]: getHourSuccess,
  [Types.GET_HOUR_FAILURE]: getHourFailure,

  [Types.REMOVE_HOUR_REQUEST]: removeHourRequest,
  [Types.REMOVE_HOUR_SUCCESS]: removeHourSuccess,
  [Types.REMOVE_HOUR_FAILURE]: removeHourFailure
}

export default createReducer(INITIAL_STATE, HANDLERS)
