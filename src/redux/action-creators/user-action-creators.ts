import { put, takeEvery } from "redux-saga/effects";
import { EMAIL_VERIFIED, LOAD_USER, SET_USER, SIGN_UP } from "action-types"
import { addressRequest } from "utils";
import type { IUser, IUserAuthorized, IUserToServer } from "types/user";
import { PAGES, type ICallbackError, type ICallbackServerError, type ICallbackSuccess, type IError } from "types";
import type { NavigateFunction } from "react-router-dom";

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

const signUp = (user: IUserToServer, callbackSuccess: ICallbackSuccess, callbackError: ICallbackError, callbackServerError: ICallbackServerError, navigate: NavigateFunction) => ({
    type: SIGN_UP,
    user,
    callbackSuccess,
    callbackError,
    callbackServerError,
    navigate
})

function* fetchSignUp(action: ReturnType<typeof signUp>) {
    const { user, callbackSuccess, callbackError, callbackServerError, navigate } = action;

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
            // const data: IUserAuthorized = yield response.json();
            // console.log(data);
            // yield put(setUser(data));
            navigate(`/${PAGES.SIGN_UP}/${PAGES.SIGN_UP_SUCCESS}`)
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

const emailVerified = (token: string, callbackSuccess: ICallbackSuccess, callbackError: ICallbackError, callbackServerError: ICallbackServerError, navigate: NavigateFunction) => ({
    type: EMAIL_VERIFIED,
    token,
    callbackSuccess,
    callbackError,
    callbackServerError,
    navigate
})

function* fetchEmailVerified(action: ReturnType<typeof emailVerified>) {
    const { token, callbackSuccess, callbackError, callbackServerError, navigate } = action;

    try {
        const response: Response = yield fetch(addressRequest.signUp, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(token)
        });
        callbackSuccess();
    
        if(response.status === 201 || response.status === 200){
            const data: IUserAuthorized = yield response.json();
            console.log(data);
            yield put(setUser(data));
            navigate(`/${PAGES.HOME}`)
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
    yield takeEvery(EMAIL_VERIFIED, fetchEmailVerified);
}

export {
    setUser,
    loadUser,
    signUp,
    emailVerified,
    watcherUser
}