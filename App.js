import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'
import { Font, AppLoading } from 'expo'

import store from './app/redux/store'

import { checkLoginStatus } from "./app/modules/auth/actions"

import Main from './app/main'

const cacheFonts = (fonts) => {
    return fonts.map(font => Font.loadAsync(font))
}

export default class App extends Component {
    constructor() {
        super()
        this.state = {
            isReady: false,
            isLoaded: false,
            isLoggedIn: false,
            exists: false //indicates if user exist in realtime database
        }
    }

    componentDidMount() {
        const _this = this
        store.dispatch(checkLoginStatus((exists, isLoggedIn) => {
            _this.setState({isReady: true, exists, isLoggedIn})
        }))
    }

    async _loadAssetsAsync() {
        const fontAssets = cacheFonts([
            {RobotoExtraBold: require('./app/assets/fonts/Roboto/Roboto-Black.ttf')},
            {RobotoBold: require('./app/assets/fonts/Roboto/Roboto-Bold.ttf')},
            {RobotoMedium: require('./app/assets/fonts/Roboto/Roboto-Medium.ttf')},
            {RobotoRegular: require('./app/assets/fonts/Roboto/Roboto-Regular.ttf')},
            {RobotoLight: require('./app/assets/fonts/Roboto/Roboto-Light.ttf')}
        ])
        await Promise.all([...fontAssets])
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <AppLoading
                    startAsync={this._loadAssetsAsync}
                    onFinish={() => this.setState({isLoaded: true})}
                    onError={console.warn}
                />
            );
        }

        return (
            <Provider store={store}>
                <Main isReady={this.state.isReady} />
            </Provider>
        )
    }
}
