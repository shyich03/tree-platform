import React, { Component } from 'react';
import Register from './Register'
import {withRouter } from 'react-router-dom'
import {api} from "../../apis"
import axios from 'axios'

class AuthRegister extends Component {
    
    render(){
        const submit= async (values)=>  {     
            var generated_csrf_token = "{{ csrf_token }}"; 
            console.log(api.defaults,{email: values.email, username: values.username, password: values.pasword, type: "register"});      
            // var res = await api.post('funder/',{email: "shyicsdfddgh03@hodtmail.com", username: "ddjrsddddfgja", password: "d"})
            // console.log(res);
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
        <Register type="Auth" submit={submit}/> 
        </div>
        )
    }
}
export default withRouter(AuthRegister)