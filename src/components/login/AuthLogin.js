import React, { Component } from 'react';
import Login from './Login'
import {withRouter } from 'react-router-dom'

class AuthLogin extends Component {
    render(){
        return (<div>
        <Login type="Auth"/> 
        </div>
        )
    }
}
export default withRouter(AuthLogin)