import React, { Component } from 'react'
import { View, SafeAreaView, Animated, Dimensions } from 'react-native'
import Swiper from 'react-native-swiper'

import ProfileScreen from '../Profile'
import SearchScreen from '../Search'
import SettingsScreen from '../Settings'

import Nav from '../../components/Nav'

import styles from './styles'

export class Home extends Component {
    constructor() {
        super()
        this.state = {
            initialised: false,
            translateX: new Animated.Value(1),
            currentIndex: 1
        }
        this.width = Dimensions.get('window').width
    }

    goToIndex = (index) => {
        this.swiper.scrollView.scrollTo({x: index * this.width})
    }

    onScroll = (e) => {
        if (!this.state.initialised) {
            return this.setState({initialised: true})
        }
        // TODO: figure out why 2.6 is the magic number to make the icons centered...
        const translateX = - (e.nativeEvent.contentOffset.x - this.width) / 2.6
        const currentIndex = e.nativeEvent.contentOffset.x / this.width

        this.setState({
            translateX,
            currentIndex
        })
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Swiper
                    ref={(ref) => this.swiper = ref}
                    loop={false}
                    showsPagination={false}
                    index={1}
                    bounces={true}
                    onScroll={this.onScroll}
                    scrollEventThrottle={16}>
                    <View style={styles.page}>
                        <SettingsScreen />
                    </View>
                    <View style={styles.page}>
                        <ProfileScreen />
                    </View>
                    <View style={styles.page}>
                        <SearchScreen />
                    </View>
                </Swiper>
                <Nav
                    goToIndex={this.goToIndex}
                    translateX={this.state.translateX}
                    currentIndex={this.state.currentIndex}
                />
            </SafeAreaView>
        )
    }
}

export default Home
