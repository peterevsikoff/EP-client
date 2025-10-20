import { LOAD_USERS, SET_USERS } from "action-types";
import { put, takeEvery } from "redux-saga/effects";
import type { IUser } from "types";
import { addressRequest } from "utils";

const setUsers = (users: IUser[]) => ({
    type: SET_USERS,
    users
})

const loadUsers = () => ({
    type: LOAD_USERS,
})

function* fetchLoadUsers(/*action: ReturnType<typeof loadUsers>*/) {
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
        yield put(setUsers(data));
    }
    // else 
    //     errorShow(response, setToastError);
}

function* watcherAdmin(){
    yield takeEvery(LOAD_USERS, fetchLoadUsers);
}

export {
    loadUsers,
    watcherAdmin
}
