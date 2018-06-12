import React, { Component } from 'react'
import { View, Easing, Animated } from 'react-native'
import { createStackNavigator } from 'react-navigation'

import ProfileScreen from '../Profile'
import SearchScreen from '../Search'
import SettingsScreen from '../Settings'

const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 750,
            easing: Easing.out(Easing.poly(4)),
            timing: Animated.timing,
            useNativeDriver: true,
        },
        screenInterpolator: sceneProps => {
            console.log(sceneProps)
            const { layout, position, scene } = sceneProps

            const thisSceneIndex = scene.index
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [width, 0],
            })

            return { transform: [ { translateX } ] }
        },
    }
}

export const Home = createStackNavigator({
    Settings: { screen: SettingsScreen },
    Profile: { screen: ProfileScreen },
    Search: { screen: SearchScreen },
}, {
    initialRouteName: 'Profile',
    // headerMode: 'none',
    transitionConfig,
    cardStyle: {
        shadowColor: 'transparent',
    }
})

// export const Home = createBottomTabNavigator({
//     Profile: ProfileScreen,
//     Search: SearchScreen,
// })

// export class Home extends Component {
//     render() {
//         return (
//             <View style={{flex: 1}}>
//                 <Navigator />
//             </View>
//         )
//     }
// }

export default Home
