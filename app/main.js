import React, { Component } from 'react'
import { connect } from 'react-redux'
import { createStackNavigator } from 'react-navigation'
import { View, StyleSheet } from 'react-native'

import Splash from './components/Splash'

import WelcomeScreen from './modules/auth/scenes/Welcome'
import LoginScreen from './modules/auth/scenes/Login'
import RegisterScreen from './modules/auth/scenes/Register'
import ForgotPassword from './modules/auth/scenes/ForgotPassword'
import CompleteProfile from './modules/auth/scenes/CompleteProfile'

import HomeScreen from './modules/home/scenes/Home'

export const UnAuthNavigation = createStackNavigator({
    Welcome: {
        screen: WelcomeScreen,
    },
    Login: {
        screen: LoginScreen,
    },
    Register: {
        screen: RegisterScreen,
    },
    ForgotPassword: {
        screen: ForgotPassword,
    },
    CompleteProfile: {
        screen: CompleteProfile,
    }
})

export const Navigation = createStackNavigator({
    Home: {
        screen: HomeScreen
    }
}, {
    headerMode: 'none',
})

export class Main extends Component {
    render() {

        if (!this.props.isReady)
            return <Splash/>

        return (
            <View style={styles.container}>
                {this.props.isLoggedIn
                    ? <Navigation />
                    : <UnAuthNavigation />
                }
            </View>
        )
    }
}

const mapStateToProps = state => ({
    isLoggedIn: state.auth.isLoggedIn
})

export default connect(mapStateToProps)(Main)

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})
