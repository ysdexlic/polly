import { createStackNavigator } from 'react-navigation'

import WelcomeScreen from './app/modules/auth/scenes/Welcome'

export default createStackNavigator({
    Welcome: {
        screen: WelcomeScreen
    }
})
