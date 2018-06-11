import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions as authActions } from '../../index'
const { resetPassword } = authActions

import Form from '../../components/Form'

const fields = [
    {
        key:'email',
        label: 'Email Address',
        placeholder:'Email',
        autoFocus:false,
        secureTextEntry:false,
        value: '',
        type: 'email'
    }
]

const error = {
    general: '',
    email: ''
}

class ForgotPassword extends Component {
    static navigationOptions = {
        title: 'Forgotten Password'
    }

    constructor() {
        super()
        this.state = {
            error: error
        }
    }

    onSubmit = (data) => {
        this.setState({error: error}) //clear out error messages
        this.props.resetPassword(data, this.onSuccess, this.onError)
    }

    onSuccess = () => {
        alert('Password Reminder Sent')
        this.props.navigation.goBack()
    }

    onError = (error) => {
        let errObj = this.state.error

        if (error.hasOwnProperty('message')) {
            errObj['general'] = error.message
        } else {
            let keys = Object.keys(error)
            keys.map((key, index) => {
                errObj[key] = error[key]
            })
        }

        this.setState({error: errObj})
    }

    render() {
        return (
            <Form
                fields={fields}
                onSubmit={this.onSubmit}
                buttonTitle={'SUBMIT'}
                error={this.state.error}/>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch,
    resetPassword
})

export default connect(null, mapDispatchToProps)(ForgotPassword)
