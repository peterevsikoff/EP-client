// import { SET_USER, SIGN_IN, SIGN_UP } from "../action-types";
// import { put, takeEvery } from "redux-saga/effects";
// import { addressRequest } from "../adress";
import { SIGN_UP } from "action-types";
import { takeEvery } from "redux-saga/effects";
import type { ICallbackError, ICallbackServerError, ICallbackSuccess, IError, IUserAuthorized, IUserToServer } from "types";
import { addressRequest } from "utils";
// import { ICallbackError, ICallbackServerError, ICallbackSuccess, IError, IUser, IUserAuthorized } from "../../types/common";
// import { writeCookie } from "../../utils";

// const signIn = (user: IUser, callbackSuccess: ICallbackSuccess, callbackSuccessRedirect:ICallbackSuccess, callbackError: ICallbackError, callbackServerError: ICallbackServerError) => ({
//     type: SIGN_IN,
//     user,
//     callbackSuccess,
//     callbackSuccessRedirect,
//     callbackError,
//     callbackServerError
// })

// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function* fetchSignIn(action: any) {
//     const { user, callbackSuccess, callbackSuccessRedirect, callbackError, callbackServerError } = action;

//     try {
//         const response: Response = yield fetch(addressRequest.signIn, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             body: JSON.stringify(user)
//         });
//         callbackSuccess();
    
//         if(response.status === 200){
//             const userAuthorized: IUserAuthorized = yield response.json();
//             writeCookie("token", userAuthorized.token as string);
//             delete userAuthorized.token;
//             yield put(setUser(userAuthorized));
//             callbackSuccessRedirect();
//             //window.location.pathname = "/";
//         }
//         else {
//             const error: IError = yield response.json();
//             callbackError(error);
//         }
//     } catch(error: unknown) {
//         if(error instanceof Error && error.message === "Failed to fetch")
//             callbackServerError();
//         else throw error;
//     }
    
// }

const signUp = (user: IUserToServer, callbackSuccess: ICallbackSuccess, callbackError: ICallbackError, callbackServerError: ICallbackServerError) => ({
    type: SIGN_UP,
    user,
    callbackSuccess,
    callbackError,
    callbackServerError
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function* fetchSignUp(action: any) {
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
    
        if(response.status === 201){
            
            const u: IUserAuthorized = yield response.json();
            console.log(u);
            //yield put(setSelectedCarrier(tempCarrier));
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

// const setUser = (user: IUserAuthorized) => ({
//     type: SET_USER,
//     user
// })

function* watcherCommon(){
    // yield takeEvery(SIGN_IN, fetchSignIn);
    yield takeEvery(SIGN_UP, fetchSignUp);
}

export {
    // setUser,
    // signIn,
    signUp,
    watcherCommon
}