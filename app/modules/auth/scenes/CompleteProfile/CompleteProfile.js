import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { actionTypes } from '../../index'
const { LOGGED_IN } = actionTypes
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
    static navigationOptions = {
        headerLeft: null
    }

    constructor() {
        super()
        this.state = {
            error: error
        }
    }

    onSubmit = (data) => {
        this.setState({error: error}) //clear out error messages

        //attach user id
        const { user } = this.props
        data['uid'] = user.uid

        this.props.createUser(data, this.onSuccess, this.onError)
    }

    onSuccess = () => {
        this.props.dispatch({type: LOGGED_IN, payload: this.props.user})
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
                  buttonTitle={'CONTINUE'}
                  error={this.state.error}/>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
})

const mapDispatchToProps = dispatch => ({
    dispatch,
    createUser: bindActionCreators(createUser, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(CompleteProfile)
