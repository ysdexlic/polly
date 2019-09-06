import React, { Component } from 'react'
import { Animated } from 'react-native'
import { Ionicons as Icon } from '@expo/vector-icons'

import styles from './styles'

export class Nav extends Component {

    getLinearValue = (index, x) => {
        const value = new Animated.Value(1 - Math.abs(x - index))
        return value
    }

    render() {

        const { translateX, goToIndex, currentIndex } = this.props
        const offsetStyle = {transform: [{translateX}]}

        return (
            <Animated.View
                style={[styles.container, offsetStyle]}
            >
                {
                    ['settings', 'home', 'search'].map((name, i) => {
                        const linearValue = this.getLinearValue(i, currentIndex)
                        const color = linearValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: ['#000', '#FF553F']
                        })
                        const opacity = linearValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.6, 1],
                        })
                        const scale = linearValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.3],
                        })

                        return (
                            <Animated.Text key={i} style={{color, opacity, transform: [{scale}]}}>
                                <Icon name={`ios-${name}`} size={35} onPress={() => goToIndex(i)} />
                            </Animated.Text>
                        )
                    })
                }
            </Animated.View>
        )
    }
}

export default Nav
