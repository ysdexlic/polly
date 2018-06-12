import * as api from './api.js'

export const uploadProfileImage = (data, successCB, errorCB) => {
    return (dispatch) => {
        api.uploadProfileImage(data, (success, data, error) => {
            if (success) {
                dispatch({type: 'SOMETHING WORKED', payload: data})
                successCB(data)
            }
            else if (error) errorCB(error)
        })
    }
}
