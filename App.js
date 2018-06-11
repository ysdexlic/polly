import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { createStackNavigator } from 'react-navigation'

import WelcomeScreen from './app/modules/auth/scenes/Welcome'

export default createStackNavigator({
    Welcome: {
        screen: WelcomeScreen
    }
})


// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
