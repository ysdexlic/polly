import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Button, SocialIcon, Divider } from 'react-native-elements'
import { Video } from 'expo-av'
import * as Facebook from 'expo-facebook'

import Bee from './Bee.mp4'

import { actions as authActions, constants as authConstants  } from '../../index'

const { signInWithFacebook } = authActions
const { FACEBOOK_APP_ID } = authConstants

import styles from './styles'

class Welcome extends Component {
    static navigationOptions = {
        header: null,
        headerBackTitle: 'Back',
    }

    constructor() {
        super()
        this.state = {}
    }

    onSignInWithFacebook = async () => {
        const options = { permissions: ['public_profile', 'email'] }
        const { type, token } = await Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, options)

        if (type === 'success') {
            this.props.signInWithFacebook(token, this.onSuccess, this.onError)
        }
    }

    onSuccess = ({ exists, user}) => {
        if (exists) {
            console.log('user already exists')
            this.props.navigation.push('Home')
        }
        else {
            this.props.navigation.push('CompleteProfile')
        }
    }

    onError = (error) => {
        alert(error.message);
    }

    register = () => {
        this.props.navigation.push('Register')
    }

    login = () => {
        this.props.navigation.push('Login')
    }

    render() {
        return (
            <View style={styles.container}>

                <Video
                    shouldPlay
                    isLooping
                    source={Bee}
                    resizeMode="cover"
                    style={StyleSheet.absoluteFill}
                />

                <View style={styles.videoMask}></View>

                <View style={styles.topContainer}>
                    <Text style={styles.title}>App Name</Text>
                </View>

                <View style={styles.bottomContainer}>
                    <View style={[styles.buttonContainer]}>
                        <SocialIcon
                            raised
                            button
                            type='facebook'
                            title='SIGN UP WITH FACEBOOK'
                            iconSize={19}
                            style={[styles.containerView, styles.socialButton]}
                            fontStyle={styles.buttonText}
                            onPress={this.onSignInWithFacebook}/>

                        <View style={styles.orContainer}>
                            <Divider style={styles.divider}/>
                            <Text style={styles.orText}>
                                or
                            </Text>
                        </View>

                        <Button
                            raised
                            title={'SIGN UP WITH E-MAIL'}
                            containerViewStyle={[styles.containerView]}
                            buttonStyle={[styles.button]}
                            textStyle={styles.buttonText}
                            onPress={this.register}/>
                    </View>
                    <View style={styles.bottom}>
                        <Text style={styles.bottomText}>
                            Already have an account?
                        </Text>

                        <TouchableOpacity onPress={this.login}>
                            <Text style={styles.signInText}>
                                Sign in
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    signInWithFacebook: bindActionCreators(signInWithFacebook, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcome)
