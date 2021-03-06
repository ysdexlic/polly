import { AsyncStorage } from 'react-native'

import { LOGGED_IN, LOGGED_OUT, SET_USER } from './actionTypes'

let initialState = { isLoggedIn: false, user: null }

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {...state, user: action.payload }

        case LOGGED_IN:
            const user = action.payload

            // Save token and data to Asyncstorage
            AsyncStorage.multiSet([
                ['user', JSON.stringify(user)]
            ])

            return {...state, isLoggedIn: true, user: user }

        case LOGGED_OUT:
            let keys = ['user']
            AsyncStorage.multiRemove(keys)

            return {...state, isLoggedIn: false, user: null}

        default:
            return state
    }
}

export default authReducer
