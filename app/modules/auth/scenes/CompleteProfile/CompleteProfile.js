import React, { Component } from 'react'
import { connect } from 'react-redux'

import { actions as authActions } from '../../index'
const { createUser } = authActions

import Form from '../../components/Form'

const fields = [
    {
        key: 'username',
        label: 'Username',
        placeholder: 'Username',
        autoFocus: false,
        secureTextEntry: false,
        value: '',
        type: 'text'
    }
]

const error = {
    general: '',
    username: ''
}

class CompleteProfile extends Component {
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

        //attach user id
        const { user } = this.props
        data['uid'] = user.uid

        this.props.createUser(data, this.onSuccess, this.onError)
    }

    onSuccess() {
        this.props.dispatch({type: 'AUTHENTICATEDDDDD'})
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
                <Form fields={fields}
                      showLabel={false}
                      onSubmit={this.onSubmit}
                      buttonTitle={'CONTINUE'}
                      error={this.state.error}/>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    dispatch,
    createUser
})

export default connect(null, mapDispatchToProps)(CompleteProfile)
