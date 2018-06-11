import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet, Alert } from 'react-native'

import { Button } from 'react-native-elements'

import styles from "./styles"

import { actions as authActions } from "../../../auth/index"
const { signOut } = authActions

export class Home extends Component {
    static navigationOptions = {
        title: 'Home',
    }

    constructor(){
        super()
        this.state = {}
    }

    onSignOut = () => {
        this.props.signOut(this.onSuccess, this.onError)
    }

    onSuccess = () => {
        this.props.dispatch({type: 'SIGNING_OUT'})
    }

    onError = (error) => {
        Alert.alert('Oops!', error.message)
    }

    render() {
        return (
            <View style={styles.container}>
                <Button
                    raised
                    borderRadius={4}
                    title={'LOG OUT'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={this.onSignOut}/>
            </View>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch,
    signOut
})

export default connect(null, mapDispatchToProps)(Home)
