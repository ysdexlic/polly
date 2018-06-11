import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions as authActions } from '../../index'
const { register } = authActions

import Form from '../../components/Form'

const fields = [
    {
        key: 'email',
        label: 'Email Address',
        placeholder: 'Email Address',
        autoFocus: false,
        secureTextEntry: false,
        value: 'test1@eandmdigital.com',
        type: 'email'
    },
    {
        key: 'username',
        label: 'Username',
        placeholder: 'Username',
        autoFocus: false,
        secureTextEntry: false,
        value: 'mosesesan',
        type: 'text'
    },
    {
        key: 'password',
        label: 'Password',
        placeholder: 'Password',
        autoFocus: false,
        secureTextEntry: true,
        value: 'testpass',
        type: 'password'
    },
    {
        key: 'confirm_password',
        label: 'Confirm Password',
        placeholder: 'Confirm Password',
        autoFocus: false,
        secureTextEntry: true,
        value: 'testpass',
        type: 'confirm_password'
    }
]

const error = {
    general: '',
    email: '',
    password: '',
    confirm_password: ''
}

class Register extends Component {
    constructor() {
        super()
        this.state = {
            error: error
        }

        this.onSubmit = this.onSubmit.bind(this)
        this.onSuccess = this.onSuccess.bind(this)
        this.onError = this.onError.bind(this)
    }

    onSubmit(data) {
        this.setState({error: error}) //clear out error messages

        this.props.register(data, this.onSuccess, this.onError)
    }

    onSuccess(user) {
        this.props.dispatch('AUTHENTICATEDDDDD')
    }

    onError(error) {
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
                showLabel={false}
                onSubmit={this.onSubmit}
                buttonTitle={'SIGN UP'}
                error={this.state.error}
            />
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch,
    register
})

export default connect(null, mapDispatchToProps)(Register)
