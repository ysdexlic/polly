import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { View, StyleSheet, Alert, CameraRoll, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import { ImagePicker, Permissions } from 'expo'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { actions as authActions } from '../../../auth/index'
import { actions as homeActions } from '../../index'
const { signOut } = authActions
const { uploadProfileImage } = homeActions

import styles from "./styles"

export class Profile extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: (
            <Button
                onPress={() => navigation.push('Settings')}
                title="Settings"
            />
        ),
        headerRight: (
            <Button
                onPress={() => navigation.push('Search')}
                title="Search"
            />
        ),
    })

    constructor(){
        super()
        this.state = {
            images: [],
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
            // console.log(result)
            // this.props.uploadProfileImage({userId: this.props.user.uid, imageUri: result.uri, imageName: 'hello world'}, this.onUploadSuccess, this.onUploadError)
            this.setState({ images: [...this.state.images, result.uri] })
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

                <View style={styles.imageContainer}>
                    {this.state.images.map((image, i) =>
                        <Image
                            key={i}
                            style={styles.image}
                            source={{ uri: image }}
                        />
                    )}
                </View>

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

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
