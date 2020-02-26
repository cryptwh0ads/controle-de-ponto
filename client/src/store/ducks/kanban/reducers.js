import { CONSTANTS } from './actions'

let listID = 3
let cardID = 4

const INITIAL_STATE = [
  {
    id: `list-${0}`,
    title: 'First List',
    cards: [
      {
        id: `card-${0}`,
        content: 'First card'
      },
      {
        id: `card-${1}`,
        content: 'Second card'
      }
    ]
  },
  {
    id: `list-${1}`,
    title: 'Second List',
    cards: [
      {
        id: `card-${2}`,
        content: 'First card'
      },
      {
        id: `card-${3}`,
        content: 'Second card'
      }
    ]
  }
]

const list = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONSTANTS.ADD_LIST:
      const newList = {
        title: action.payload,
        cards: [],
        id: `list-${listID}`
      }
      listID += 1
      return [...state, newList]
    case CONSTANTS.ADD_CARD:
      const newCard = {
        content: action.payload.content,
        id: `card-${cardID}`
      }
      cardID += 1

      const newState = state.map(list => {
        if (list.id === action.payload.listID) {
          return {
            ...list,
            cards: [...list.cards, newCard]
          }
        } else {
          return list
        }
      })

      return newState

    case CONSTANTS.DRAG_HAPPENED:
      const {
        droppableIdStart,
        droppableIdEnd,
        droppableIndexStart,
        droppableIndexEnd,
        type
      } = action.payload

      const newStat = [...state]

      // dragging lists around
      if (type === 'list') {
        const list = newStat.splice(droppableIndexStart, 1)
        newStat.splice(droppableIndexEnd, 0, ...list)

        return newStat
      }

      // in the same list
      if (droppableIdStart === droppableIdEnd) {
        const list = state.find(list => droppableIdStart === list.id)
        const card = list.cards.splice(droppableIndexStart, 1)
        list.cards.splice(droppableIndexEnd, 0, ...card)
      }

      // other list

      if (droppableIdStart !== droppableIdEnd) {
        // find the list where drag happened
        const listStart = state.find(list => droppableIdStart === list.id)

        // pull out the card from this list
        const card = listStart.cards.splice(droppableIndexStart, 1)

        // find the list where drag ended
        const listEnd = state.find(list => droppableIdEnd === list.id)

        // put the card in the new list
        listEnd.cards.splice(droppableIndexEnd, 0, ...card)
      }

      return newStat
    default:
      return state
  }
}

export default list
