import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

/**
 * Import Reducers and Sagas
 */
import reducers from './ducks/rootReducer'
import sagas from './ducks/rootSaga'

// Create custom saga middleware
const sagaMiddleware = createSagaMiddleware()

// Create custom store, connecting saga middleware to store
export default createStore(reducers, applyMiddleware(sagaMiddleware))

// start saga
sagaMiddleware.run(sagas)
