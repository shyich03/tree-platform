import React, { Component } from 'react';
import Login from './Login'
import {withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

class OwnerLogin extends Component {
    render(){
        this.props.onUpdateType("Owner")
        return (<div>
        <Login /> 
        </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        type: state.user_type
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onUpdateType: type => dispatch(actions.updateType(type)) 
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OwnerLogin))