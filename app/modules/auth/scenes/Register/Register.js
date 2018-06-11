import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

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
        value: 'david.arthur.thompson@gmail.com',
        type: 'email'
    },
    {
        key: 'username',
        label: 'Username',
        placeholder: 'Username',
        autoFocus: false,
        secureTextEntry: false,
        value: 'ysdexlic',
        type: 'text'
    },
    {
        key: 'password',
        label: 'Password',
        placeholder: 'Password',
        autoFocus: false,
        secureTextEntry: true,
        value: 'Password123',
        type: 'password'
    },
    {
        key: 'confirm_password',
        label: 'Confirm Password',
        placeholder: 'Confirm Password',
        autoFocus: false,
        secureTextEntry: true,
        value: 'Password123',
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
    }

    onSubmit = (data) => {
        this.setState({error}) //clear out error messages
        this.props.register(data, this.onSuccess, this.onError)
    }

    onSuccess = (user) => {
        this.props.dispatch({type: 'AUTHENTICATEDDDDD'})
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
    register: bindActionCreators(register, dispatch),
})

export default connect(null, mapDispatchToProps)(Register)
