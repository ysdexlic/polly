import React, { Component } from 'react'
import { View, Text, ActivityIndicator, Image } from 'react-native'

import styles from './styles'

export default class extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.wrapper}>
                    <Image style={styles.image} source={{uri: "https://thebeardydeveloper.com/me.png"}}/>
                    <Text style={styles.title}>App Name</Text>
                </View>
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true}/>
                </View>
            </View>
        )
    }
}
