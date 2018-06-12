import React, { Component } from 'react'
import { createBottomTabNavigator } from 'react-navigation'

import ProfileScreen from '../Profile'
import SearchScreen from '../Search'

export const Home = createBottomTabNavigator({
    Profile: ProfileScreen,
    Search: SearchScreen,
})

export default Home
