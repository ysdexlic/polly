import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, StyleSheet, Alert, CameraRoll, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo'
import { actions as homeActions } from '../../index'

import styles from "./styles"

import { actions as authActions } from "../../../auth/index"
const { signOut } = authActions
const { uploadProfileImage } = homeActions

export class Home extends Component {
    static navigationOptions = {
        title: 'Home',
    }

    constructor(){
        super()
        this.state = {
            image: '',
        }
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

    uploadImage = async () => {
        const permission = await Permissions.askAsync(Permissions.CAMERA_ROLL)
        if (!permission.status == 'granted') {
            Alert.alert('You need to grant the app access to your photos')
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            aspect: [4, 3],
        })

        if (!result.cancelled) {
            console.log(result)
            this.props.uploadProfileImage({userId: this.props.user.uid, imageUri: result.uri, imageName: 'hello world'}, this.onUploadSuccess, this.onUploadError)
            this.setState({ image: result.uri })
        }
    }

    onUploadSuccess = () => {
        console.log('onUploadSuccess')
    }

    onUploadError = (error) => {
        console.log(error.message)
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
                    onPress={this.onSignOut}
                />

                <Button
                    raised
                    borderRadius={4}
                    title={'UPLOAD IMAGE'}
                    containerViewStyle={[styles.containerView]}
                    buttonStyle={[styles.button]}
                    textStyle={styles.buttonText}
                    onPress={this.uploadImage}
                />

            </View>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    signOut: bindActionCreators(signOut, dispatch),
    uploadProfileImage: bindActionCreators(uploadProfileImage, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
