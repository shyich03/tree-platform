import React, { Component } from 'react';
import Login from './Login'
import {withRouter } from 'react-router-dom'

class FunderLogin extends Component {
    render(){
        return (<div>
        <Login type="funder"/> 
        </div>
        )
    }
}
export default withRouter(FunderLogin)