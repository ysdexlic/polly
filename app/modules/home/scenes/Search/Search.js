import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export class Search extends Component {
    static navigationOptions = {
        title: 'Search',
        tabBarIcon: ({ focused, tintColor }) => <Ionicons name={`ios-search${focused ? '' : '-outline'}`} size={25} color={tintColor} />,
    }

    render() {
        return (
            <View>
                <Text>Search</Text>
            </View>
        )
    }
}

export default Search
