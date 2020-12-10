import React, { Component } from 'react';
import Register from './Register'
import {withRouter } from 'react-router-dom'
import {api} from "../../apis"

class OwnerRegister extends Component {
    
    render(){
        const submit=(values)=>{
            api.put('/user/',values)
        }
        return (<div>
        <Register type="Owner" submit={submit}/> 
        </div>
        )
    }
}
export default withRouter(OwnerRegister)