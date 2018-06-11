import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Video } from 'expo'

import Bee from './Bee.mp4'

import { Button, SocialIcon, Divider } from 'react-native-elements'
import { connect } from 'react-redux'

import { actions as auth } from '../../index'

const {} = auth

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

    onSignInWithFacebook = () => {
        console.log('logging in with facebook')
    }

    register = () => {
        console.log('registering')
        this.props.navigation.push('Register')
    }

    login = () => {
        console.log('logging in')
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

export default connect(mapStateToProps)(Welcome)
