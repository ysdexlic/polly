import React, { Component } from 'react'
import { View, Text, Animated, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'
import Icon from 'react-native-vector-icons/Ionicons'

import ProfileScreen from '../Profile'
import SearchScreen from '../Search'
import SettingsScreen from '../Settings'


export class Home extends Component {
    constructor() {
        super()
        this.state = {
            x: 0
        }
        this.width = Dimensions.get('window').width
        this.translateX = new Animated.Value(375)
    }

    viewStyle() {
        return {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    onScroll = (e) => {
        const value = - (e.nativeEvent.contentOffset.x - this.width) / 2.5

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
                    style={{
                        flexDirection: 'row',
                        paddingHorizontal: 30,
                        width: '100%',
                        justifyContent: 'space-between',
                        transform: [{translateX: this.translateX}]
                    }}
                >
                    <Icon name="ios-settings-outline" size={30} />
                    <Icon name="ios-home-outline" size={30} />
                    <Icon name="ios-search-outline" size={30} />
                </Animated.View>
            </View>
        )
    }
}

export default Home
