import { put, takeEvery } from "redux-saga/effects";
import { LOAD_USER, SET_USER } from "action-types"
import { addressRequest } from "utils";
import type { IUser } from "types/user";

const setUser = (user: IUser) => ({
    type: SET_USER,
    user
})

const loadUser = () => ({
    type: LOAD_USER,
})

function* fetchLoadUser(/*action: ReturnType<typeof loadUser>*/) {
    // const { setToastError } = action;

    // yield put(setUser("Иванов"));

    const response: Response = yield fetch(addressRequest.getAllUsers, {
        // headers: {Authorization: `Bearer ${getCookie("accessToken")}`}
    });
    console.log(response);
    if(response.status === 200){
        // const data: string = yield response.text();
        const data: IUser[] = yield response.json();
        console.log(data);
        yield put(setUser(data[0]));
    }
    // else 
    //     errorShow(response, setToastError);
}

function* watcherUser(){
    yield takeEvery(LOAD_USER, fetchLoadUser);
}

export {
    setUser,
    loadUser,
    watcherUser,
}