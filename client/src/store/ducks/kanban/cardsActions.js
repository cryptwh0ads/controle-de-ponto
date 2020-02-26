import { CONSTANTS } from './actions'

export const addCard = (listID, content) => {
  return {
    type: CONSTANTS.ADD_CARD,
    payload: { content, listID }
  }
}
