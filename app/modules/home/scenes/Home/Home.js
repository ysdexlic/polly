import React, { Component } from 'react'
import { View, Text, Animated, Dimensions } from 'react-native'
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
        this.translateX = new Animated.Value(0)
        this.width = Dimensions.get('window').width
    }

    viewStyle() {
        return {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    onScroll = (e) => {
        const value = - (e.nativeEvent.contentOffset.x - this.width) / 3

        this.element.setNativeProps({
            style: {
                transform: [{
                    translateX: value
                }]
            }
        })
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
                <Animated.View
                    ref={(ref) => this.element = ref}
                    style={{transform: [{translateX: this.translateX}]}}
                >
                    <Text>Hello World!</Text>
                </Animated.View>
            </View>
        )
    }
}

export default Home
