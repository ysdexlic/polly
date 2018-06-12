import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

export class Settings extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: null,
        headerRight: (
            <Button
                onPress={() => navigation.goBack()}
                title="Profile"
            />
        ),
    })

    render() {
        return (
            <View>
                <Text>Settings</Text>
            </View>
        )
    }
}

export default Settings
