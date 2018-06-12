import { LOGGED_IN, LOGGED_OUT, SET_USER } from './actionTypes'
import * as api from './api'
import { auth } from "../../config/firebase"

export const register = (data, successCB, errorCB) => {
    return (dispatch) => {
        api.register(data, (success, data, error) => {
            if (success) {
                dispatch({type: LOGGED_IN, payload: data})
                successCB(data)
            }
            else if (error) errorCB(error)
        })
    }
}

export const createUser = (user, successCB, errorCB) => {
    return (dispatch) => {
        api.createUser(user, (success, data, error) => {
            if (success) {
                dispatch({type: LOGGED_IN, payload: user})
                successCB()
            } else if (error) errorCB(error)
        })
    }
}

export const login = (data, successCB, errorCB) => {
    return (dispatch) => {
        api.login(data, (success, data, error) => {
            if (success) {
                if (data.exists) dispatch({type: LOGGED_IN, payload: data.user})
                successCB(data)
            } else if (error) errorCB(error)
        })
    }
}

export const resetPassword = (data, successCB, errorCB) => {
    return (dispatch) => {
        api.resetPassword(data, (success, data, error) => {
            if (success) successCB()
            else if (error) errorCB(error)
        })
    }
}

export const signOut = (successCB, errorCB) => {
    return (dispatch) => {
        api.signOut((success, data, error) => {
            if (success) {
                dispatch({type: LOGGED_OUT})
                successCB()
            } else if (error) errorCB(error)
        })
    }
}

export const checkLoginStatus = (callback) => {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            let isLoggedIn = (user !== null)

            if (isLoggedIn){
                api.getUser(user, (success, { exists, user }, error) => {
                    if (success) {
                        if (exists) dispatch({type: LOGGED_IN, payload: user})
                        callback(exists, isLoggedIn)
                    } else if (error) {
                        //unable to get user
                        dispatch({type: LOGGED_OUT})
                        callback(false, false)
                    }
                })
            } else {
                dispatch({type: LOGGED_OUT})
                callback(false, isLoggedIn)
            }
        })
    }
}

export const signInWithFacebook = (facebookToken, successCB, errorCB) => {
    return (dispatch) => {
        api.signInWithFacebook(facebookToken, (success, data, error) => {
            if (success) {
                console.log(data)
                dispatch({type: SET_USER, payload: data.user})
                if (data.exists) dispatch({type: LOGGED_IN, payload: data.user})
                successCB(data)
            } else if (error) errorCB(error)
        })
    }
}
