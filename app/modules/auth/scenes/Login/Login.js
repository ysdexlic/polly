import React from 'react'
import { connect } from 'react-redux'

import { actions as authActions } from '../../index'

import Form from '../../components/Form'

const { login } = authActions

const fields = [
    {
        key: 'email',
        label: 'Email Address',
        placeholder: 'Email Address',
        autoFocus: false,
        secureTextEntry: false,
        value: '',
        type: 'email'
    },
    {
        key: 'password',
        label: 'Password',
        placeholder: 'Password',
        autoFocus: false,
        secureTextEntry: true,
        value: '',
        type: 'password'
    }
]

const error = {
    general: '',
    email: '',
    password: ''
}

class Login extends React.Component {
    static navigationOptions = {
        title: 'Log In'
    }

    constructor() {
        super()
        this.state = {
            error: error
        }
    }

    onForgotPassword() {
        this.props.dispatch({type: 'FORGOT_PASSWORD'})
    }

    onSubmit = (data) => {
        this.setState({error: error}) //clear out error messages

        this.props.login(data, this.onSuccess, this.onError)
    }

    onSuccess = ({exists, user}) => {
        if (exists) this.props.dispatch({type: 'AUTHENTICATEDDDDD'})
        else this.props.dispatch({type: 'SIGNED_URPPP', payload: user})
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
            <Form fields={fields}
                  showLabel={false}
                  onSubmit={this.onSubmit}
                  buttonTitle={'LOG IN'}
                  error={this.state.error}
                  onForgotPassword={this.onForgotPassword}/>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch,
    login
})

export default connect(null, mapDispatchToProps)(Login)
