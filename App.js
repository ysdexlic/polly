import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Provider } from 'react-redux'

import store from './app/redux/store'

import Main from './app/main'

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
            <Main />
        </Provider>
    )
  }
}
