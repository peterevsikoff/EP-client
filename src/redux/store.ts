import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { commonReducer, userReducer } from "./reducers";
import { watcherCommon, watcherUser } from "./action-creators";

const middleWare = createSagaMiddleware();

function* rootSaga() {
    yield all([
        watcherUser(),
        watcherCommon(),
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