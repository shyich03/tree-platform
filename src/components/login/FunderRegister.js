import React, { Component } from 'react';
import Register from './Register'
import {withRouter } from 'react-router-dom'
import {api} from "../../apis"

class FunderRegister extends Component {
    
    render(){
        const submit= async (values)=>  {     
            // var generated_csrf_token = "{{ csrf_token }}"; 
            // console.log(api.defaults,{email: values.email, username: values.username, password: values.pasword, type: "register"});      
            // var res = await api.post('funder/',{
            //     email: values.email, 
            //     username: values.username, 
            //     password: values.pasword, 
            //     type: "register"})
            console.log(values);
            // var res = await api.get('funder/')
            // console.log(res);
            // axios({
            //     method:'get',
            //     url:'/user/',
            //     baseURL: 'http://localhost:8000/api',
            //     headers: {'X-CSRFToken': generated_csrf_token},
            //    })
            //    .then(response => {
            //       print(reponse)
            //    })
            //    .catch(error => {
            //        console.log(error);
            //    });
        }
        return (<div>
        <Register type="Funder" submit={submit} /> 
        </div>
        )
    }
}
export default withRouter(FunderRegister)