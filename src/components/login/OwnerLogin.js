import React, { Component } from 'react';
import Login from './Login'
import {withRouter } from 'react-router-dom'

class OwnerLogin extends Component {
    render(){
        return (<div>
        <Login /> 
        </div>
        )
    }
}
export default withRouter(OwnerLogin)