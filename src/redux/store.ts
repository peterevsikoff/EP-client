import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { all } from "redux-saga/effects";
import { adminReducer, commonReducer, userReducer } from "./reducers";
import { watcherAdmin, watcherCommon, watcherUser } from "./action-creators";

const middleWare = createSagaMiddleware();

function* rootSaga() {
    yield all([
        watcherUser(),
        watcherCommon(),
        watcherAdmin(),
    ]);
}

const store = createStore(combineReducers({
    user: userReducer,
    common: commonReducer,
    admin: adminReducer,
}), {}, applyMiddleware(middleWare));

middleWare.run(rootSaga);

store.subscribe(() => {
})

export { store };