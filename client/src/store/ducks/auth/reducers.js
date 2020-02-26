import { createReducer } from 'reduxsauce'
import { Types } from '../../actionCreators'

export const INITIAL_STATE = {
  isAuthing: false,
  isAuth: false,
  isSigningin: false,
  isSaving: false,
  saved: false,
  user: {},
  error: false,
  errorMessage: ''
}

export const signinRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningin: true,
    error: false,
    errorMessage: ''
  }
}

export const signinSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningin: false,
    isAuth: true,
    user: action.user
  }
}

export const signinFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningin: false,
    error: true,
    errorMessage: action.error
  }
}

//AUTH

export const authRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningin: true,
    error: false,
    errorMessage: ''
  }
}

export const authSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningin: false,
    isAuth: true,
    user: action.user
  }
}

export const authFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningin: false,
    isAuth: false
  }
}

//TESTE
export const teste = (state = INITIAL_STATE, action) => {
  return {
    ...state
  }
}

//LOGOUT
export const destroyAuthSuccess = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSigningin: false,
    isAuth: false,
    user: {}
  }
}

//PROFILE
export const updateProfileRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSaving: true,
    error: false,
    errorMessage: '',
    saved: false
  }
}

export const updateProfileSuccess = (state = INITIAL_STATE, action) => {
  const newUser = {
    ///user: state.user,
    ...state.user
  }

  Object.keys(action.user).forEach(key => {
    newUser[key] = action.user[key]
  })

  return {
    ...state,
    isSaving: false,
    user: newUser,
    saved: true
  }
}

export const updateProfileFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSaving: false,
    error: true,
    errorMessage: action.error,
    saved: false
  }
}

export const updateProfileReset = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSaving: false,
    saved: false
  }
}

//Create PROFILE
export const createProfileRequest = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSaving: true,
    error: false,
    errorMessage: '',
    saved: false
  }
}

export const createProfileSuccess = (state = INITIAL_STATE, action) => {
  const newUser = {
    ///user: state.user,
    ...state.user
  }

  Object.keys(action.user).forEach(key => {
    newUser[key] = action.user[key]
  })
  return {
    ...state,
    isSaving: false,
    newUser: newUser,
    saved: true
  }
}

export const createProfileFailure = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSaving: false,
    error: true,
    errorMessage: action.error,
    saved: false
  }
}

export const createProfileReset = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    isSaving: false,
    saved: false
  }
}

export const HANDLERS = {
  [Types.SIGNIN_REQUEST]: signinRequest,
  [Types.SIGNIN_SUCCESS]: signinSuccess,
  [Types.SIGNIN_FAILURE]: signinFailure,

  [Types.AUTH_REQUEST]: authRequest,
  [Types.AUTH_SUCCESS]: authSuccess,
  [Types.AUTH_FAILURE]: authFailure,

  //logout
  [Types.DESTROY_AUTH_SUCCESS]: destroyAuthSuccess,

  //Profile
  [Types.UPDATE_PROFILE_RESET]: updateProfileReset,
  [Types.UPDATE_PROFILE_REQUEST]: updateProfileRequest,
  [Types.UPDATE_PROFILE_SUCCESS]: updateProfileSuccess,
  [Types.UPDATE_PROFILE_FAILURE]: updateProfileFailure,

  //Create
  [Types.CREATE_PROFILE_RESET]: createProfileReset,
  [Types.CREATE_PROFILE_REQUEST]: createProfileRequest,
  [Types.CREATE_PROFILE_SUCCESS]: createProfileSuccess,
  [Types.CREATE_PROFILE_FAILURE]: createProfileFailure
}

export default createReducer(INITIAL_STATE, HANDLERS)
