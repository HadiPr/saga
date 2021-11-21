import createSagaMiddleware from "redux-saga"
import { applyMiddleware, compose, createStore } from "redux"
import reducer from "./reducer"
import RootSaga from "./saga"

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
     reducer,
     composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(RootSaga)


export default store
