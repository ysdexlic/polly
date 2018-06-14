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
            opacity1: 1,
            opacity2: 1,
            opacity3: 1
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

    getOpacity = (index, x) => {
        // middle point: i * w
        // lowest point: ((i * w) - w)
        // highest point: ((i * w) + w)

        const lowest = (index * this.width) - this.width
        const highest = (index * this.width) + this.width
        const opacity = - (x - (lowest/this.width)) * (x - (highest/this.width))
        return opacity + 0.4
    }

    onScroll = (e) => {
        const value = - (e.nativeEvent.contentOffset.x - this.width) / 2.5
        const currentIndex = e.nativeEvent.contentOffset.x / this.width

        this.element.setNativeProps({
            style: {
                transform: [{
                    translateX: value
                }]
            }
        })

        this.setState({
            opacity1: this.getOpacity(0, currentIndex),
            opacity2: this.getOpacity(1, currentIndex),
            opacity3: this.getOpacity(2, currentIndex),
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
                    <Icon name="ios-settings-outline" size={30} style={{color: 'blue', opacity: this.state.opacity1}}/>
                    <Icon name="ios-home-outline" size={30} style={{color: 'blue', opacity: this.state.opacity2}}/>
                    <Icon name="ios-search-outline" size={30} style={{color: 'blue', opacity: this.state.opacity3}}/>
                </Animated.View>
            </View>
        )
    }
}

export default Home
