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
            linearValue1: new Animated.Value(1),
            linearValue2: new Animated.Value(1),
            linearValue3: new Animated.Value(1),
            translateX: new Animated.Value(0)
        }
        this.width = Dimensions.get('window').width
    }

    viewStyle() {
        return {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }

    goToIndex = (index) => {
        this.swiper.scrollView.scrollTo({x: index * this.width})
    }

    getLinearValue = (index, x) => {
        const value = new Animated.Value(1 - Math.abs(x - index))
        return value
    }

    onScroll = (e) => {
        const translateX = - (e.nativeEvent.contentOffset.x - this.width) / 2.5
        const currentIndex = e.nativeEvent.contentOffset.x / this.width

        this.setState({
            translateX,
            linearValue1: this.getLinearValue(0, currentIndex),
            linearValue2: this.getLinearValue(1, currentIndex),
            linearValue3: this.getLinearValue(2, currentIndex),
        })
    }

    componentDidMount() {
        // TODO: remove this massive hack to fix onScroll triggering on load
        setTimeout(() => {
            this.onScroll({nativeEvent: {contentOffset: {x: 375}}})
        }, 1)
    }

    render() {
        // TODO: move animated icon to own component so I don't have to do everything 3 fucking times
        const color1 = this.state.linearValue1.interpolate({
            inputRange: [0, 1],
            outputRange: ['#000', '#FF553F']
        })
        const color2 = this.state.linearValue2.interpolate({
            inputRange: [0, 1],
            outputRange: ['#000', '#FF553F']
        })
        const color3 = this.state.linearValue3.interpolate({
            inputRange: [0, 1],
            outputRange: ['#000', '#FF553F']
        })

        const opacity1 = this.state.linearValue1.interpolate({
            inputRange: [0, 1],
            outputRange: [0.6, 1],
        })
        const opacity2 = this.state.linearValue2.interpolate({
            inputRange: [0, 1],
            outputRange: [0.6, 1],
        })
        const opacity3 = this.state.linearValue3.interpolate({
            inputRange: [0, 1],
            outputRange: [0.6, 1],
        })

        const scale1 = this.state.linearValue1.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.5],
        })
        const scale2 = this.state.linearValue2.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.5],
        })
        const scale3 = this.state.linearValue3.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1.5],
        })

        return (
            <View style={this.viewStyle()}>
                <Swiper
                    ref={(ref) => this.swiper = ref}
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
                        transform: [{translateX: this.state.translateX}]
                    }}
                >
                    <Animated.Text style={{color: color1, opacity: opacity1, transform: [{scale: scale1}]}}>
                        <Icon name="ios-settings-outline" size={30} onPress={() => this.goToIndex(0)} />
                    </Animated.Text>
                    <Animated.Text style={{color: color2, opacity: opacity2, transform: [{scale: scale2}]}}>
                        <Icon name="ios-home-outline" size={30} onPress={() => this.goToIndex(1)} />
                    </Animated.Text>
                    <Animated.Text style={{color: color3, opacity: opacity3, transform: [{scale: scale3}]}}>
                        <Icon name="ios-search-outline" size={30} onPress={() => this.goToIndex(2)} />
                    </Animated.Text>
                </Animated.View>
            </View>
        )
    }
}

export default Home
