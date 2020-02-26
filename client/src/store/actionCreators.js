import { createActions } from 'reduxsauce'

/**
 * Build own object which contain Types and Creators
 */

export const { Types, Creators } = createActions({
  /**
   ********** **
   * *Session* *
   *************
   */

  /**
   * - Sign
   * @param 'username', 'passwd' - string, sent to request
   * passwd, will be hashed in backend to encrypt.
   *
   * @returns 'user' - object, that will be verified.
   */
  signinRequest: ['username', 'passwd'],
  signinSuccess: ['user'],
  signinFailure: ['error'],

  /**
   * - Auth
   * @returns 'user' - object, validate authentication.
   */
  authRequest: null,
  authSuccess: ['user'],
  authFailure: null,

  /**
   * - Destroy
   *
   * called to destroy session and redirect user to login page.
   */
  destroyAuthRequest: null,
  destroyAuthSuccess: null,

  /**
   **********
   * *Hour* *
   **********
   */

  /**
   * - Read (admin)
   * @param 'admin' - boolean, sent to request
   * @param 'userID' - number, sent to request,
   * to show only hours for specific user.
   *
   * @returns 'hours' - array, containing hours of user requested from admin,
   * or hours of user logged.
   * @returns 'users' - array, containing all users,
   * which will be listed for admin.
   * @returns 'currentUser' - object data,
   * containing the current user that is selected.
   */
  getHoursRequest: ['admin', 'userID', 'page'],
  getHoursSuccess: ['hours', 'users', 'currentUser', 'page'],
  getHoursFailure: null,

  /**
   * - Delete (admin)
   * @param 'id' - number, sent to request
   * for the exact record that will be deleted
   *
   * @returns 'id' - number, to inform the record deleted.
   */

  removeHourRequest: ['id'],
  removeHourSuccess: ['id'],
  removeHourFailure: null,

  /**
   * - Read (user)
   * @param 'id' - number, sent on request to
   * obtain the hours of the logged in user
   *
   * @returns 'hour' - array, containing the hours from that user
   */
  getHourRequest: ['id'],
  getHourSuccess: ['hour'],
  getHourFailure: null,

  /**
   * - Update (user)
   * method called by action on click to mark hours.
   *
   * @event updateHourReset - method called before the load data of user's hour
   * that will be updated, to prevent load older data loaded.
   *
   * - Update (admin)
   * @param 'hour' - object, containing all data that will be updated.
   *
   * @returns 'hour' - object, containing the information with successful.
   */

  updateHourReset: null,
  updateHourRequest: ['hour'],
  updateHourSuccess: ['hour'],
  updateHourFailure: ['error'],

  /**
   * - Create
   * @param 'hour' - object array, containing the data that will be recorded.
   *
   * @returns 'hour' - object, containing the information with successful.
   */

  createHourRequest: ['hour'],
  createHourSuccess: ['hour'],
  createHourFailure: ['error'],

  /**
   **********
   * *User* *
   **********
   */

  /**
   *  - Read (admin)
   * @returns 'users' - array data, containing all registered users.
   */
  getUsersRequest: null,
  getUsersSuccess: ['users'],
  getUsersFailure: null,

  /**
   * - Read (admin)
   *
   * @param 'id' - number,  sent to request to get all infos from user
   * that will be updated.
   * @returns 'user' - array data, containing all infos of user requested.
   */

  getUserRequest: ['id'],
  getUserSuccess: ['user'],
  getUserFailure: null,

  /**
   *
   * - Update
   * @event updateUserReset - method called before the load data of user
   * that will be updated, to prevent load older data loaded.
   *
   * @param 'user' - object, containing all data that will be updated.
   * @returns 'user' - object, containing the information with successful.
   */
  updateUserReset: null,
  updateUserRequest: ['user'],
  updateUserSuccess: ['user'],
  updateUserFailure: ['error'],

  /**
   * - Delete (admin)
   * @param 'id' - number, sent to request
   * for the exact record that will be deleted
   *
   * @returns 'id' - number, to inform the record deleted.
   */

  removeUserRequest: ['id'],
  removeUserSuccess: ['id'],
  removeUserFailure: null,

  /**
   *************
   * *Profile* *
   *************
   */

  /**
   * - Update (password change)
   * @event updateProfileReset - method called before the load data of user
   * that will be updated, to prevent load older data loaded.
   *
   * @param 'user' - object, containing all data that will be updated.
   * @returns 'user' - object, containing the information with successful.
   */
  updateProfileReset: null,
  updateProfileRequest: ['user'],
  updateProfileSuccess: ['user'],
  updateProfileFailure: ['error'],

  /**
   * - Create (admin)
   * @param 'user' - object array, containing the data that will be recorded.
   *
   * @returns 'user' - object, containing the information with successful.
   */

  createProfileReset: null,
  createProfileRequest: ['user'],
  createProfileSuccess: ['user'],
  createProfileFailure: ['error'],

  /**
   *************
   * *Kanban* *
   *************
   */

  /**
   * Cards
   */
  getCardsRequest: null,
  getCardsSuccess: ['cards'],
  getCardsFailure: null,

  createCardReset: null,
  createCardRequest: ['card'],
  createCardSuccess: ['card'],
  createCardFailure: ['error']
})

export default Creators
