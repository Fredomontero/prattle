import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers/index";
import rootSaga from "../sagas/root-saga";
// import logger from "redux-logger";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware]

const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export default store;