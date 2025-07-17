import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { commonReducer, userReducer } from "./reducers";
import { watcherUser } from "./action-creators";

const middleWare = createSagaMiddleware();

function* rootSaga() {
    yield all([
        watcherUser(),
    ]);
}

const store = createStore(combineReducers({
    user: userReducer,
    common: commonReducer,
}), {}, applyMiddleware(middleWare));

middleWare.run(rootSaga);

store.subscribe(() => {
})

export { store };