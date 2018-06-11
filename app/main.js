import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import { View, Text } from 'react-native'

import WelcomeScreen from './modules/auth/scenes/Welcome'
import HomeScreen from './modules/home/scenes/Home'

export const UnAuthNavigation = createStackNavigator({
    Welcome: {
        screen: WelcomeScreen
    }
})

export const Navigation = createStackNavigator({
    Home: {
        screen: HomeScreen
    }
})

export class Main extends Component {
    render() {
        if (!this.props.isLoggedIn) {
            return <UnAuthNavigation />
        }
        return <Navigation />
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(Main)
