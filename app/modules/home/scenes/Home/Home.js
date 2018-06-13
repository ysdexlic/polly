import React, { Component } from 'react'
import { View, Text } from 'react-native'
import Swiper from 'react-native-swiper'

import ProfileScreen from '../Profile'
import SearchScreen from '../Search'
import SettingsScreen from '../Settings'


export class Home extends Component {
    constructor() {
        super()
        this.state = {
            x: 0
        }
    }

    viewStyle() {
        return {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    onScroll = (e) => {
        this.setState({x: e.nativeEvent.contentOffset.x})
    }

    render() {
        return (
            <View style={this.viewStyle()}>
                <Swiper
                    loop={false}
                    showsPagination={false}
                    index={1}
                    bounces={true}
                    onScroll={this.onScroll}
                    scrollEventThrottle={16}>
                    <View style={this.viewStyle()}>
                        <SettingsScreen />
                    </View>
                    <View style={this.viewStyle()}>
                        <ProfileScreen />
                    </View>
                    <View style={this.viewStyle()}>
                        <SearchScreen />
                    </View>
                </Swiper>
                <Text>{this.state.x}</Text>
            </View>
        )
    }
}

export default Home
