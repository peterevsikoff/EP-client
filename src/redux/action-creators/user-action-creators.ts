import { put, takeEvery } from "redux-saga/effects";
import { LOAD_USER, SET_USER, SIGN_UP } from "action-types"
import { addressRequest } from "utils";
import type { IUser, IUserAuthorized, IUserToServer } from "types/user";
import type { ICallbackError, ICallbackServerError, ICallbackSuccess, IError } from "types";

const setUser = (user: IUserAuthorized) => ({
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
        // yield put(setUser(data[0]));
    }
    // else 
    //     errorShow(response, setToastError);
}

const signUp = (user: IUserToServer, callbackSuccess: ICallbackSuccess, callbackError: ICallbackError, callbackServerError: ICallbackServerError) => ({
    type: SIGN_UP,
    user,
    callbackSuccess,
    callbackError,
    callbackServerError
})

function* fetchSignUp(action: ReturnType<typeof signUp>) {
    const { user, callbackSuccess, callbackError, callbackServerError } = action;

    try {
        const response: Response = yield fetch(addressRequest.signUp, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });
        callbackSuccess();
    
        if(response.status === 201 || response.status === 200){
            const data: IUserAuthorized = yield response.json();
            console.log(data);
            yield put(setUser(data));
        }
        else {
            const error: IError = yield response.json();
            callbackError(error);
        }
    } catch(error: unknown) {
        if(error instanceof Error && error.message === "Failed to fetch")
            callbackServerError();
        else throw error;
    }
}

function* watcherUser(){
    yield takeEvery(LOAD_USER, fetchLoadUser);
    yield takeEvery(SIGN_UP, fetchSignUp);
}

export {
    setUser,
    loadUser,
    signUp,
    watcherUser
}