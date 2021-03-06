import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons'

export class Search extends Component {
    static navigationOptions = ({ navigation }) => ({
        headerLeft: (
            <Button
                onPress={() => navigation.goBack()}
                title="Profile"
            />
        ),
    })

    render() {
        return (
            <View>
                <Text>Search</Text>
            </View>
        )
    }
}

export default Search
