import React, {Component}from 'react';
import 'antd/dist/antd.css';
import {Layout, Form, Input, Button, Checkbox, Spin} from 'antd';
import { withRouter } from "react-router-dom";
import {  UserOutlined, LockOutlined  } from '@ant-design/icons';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';



class Login extends Component{
  
  
  componentDidMount(){
    console.log("login mount")
  }
  componentWillUnmount(){
    console.log("login unmount")
  }
  
  render() {
    const onFinish = (values) => {
      const {history, onAuth, type} = this.props
      console.log(this.props);
      onAuth(values.username, values.password, type, (res)=>{
        console.log('Success:', values, res);
        history.push({
          pathname : "/overview",
        })
      })
      
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
    
    const handleRegister = ()=>{
      const {history,type} = this.props
      const path = 
        type=="Funder"? "/FunderRegister":
        type=="Owner"? "/OwnerRegister":
        "/AuthRegister"
      console.log('register',type);
      history.push({
        pathname : path,
      })
    }
    let errorMessage = null;
    if (this.props.error){
      errorMessage = (
        <p>{this.props.error.message}</p>
      )
    }
    return (
      <div>
      {errorMessage}
      {
        this.props.loading ?

        <Spin  />

        :
      <Layout style={{height:"100vh"}}>
      <Form
        style={{width: 400, margin:"150px auto"}}
        {...this.layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your Username!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button style={{width:"100%"}} type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <Button type="link" onClick={handleRegister}>register now!</Button>
      </Form.Item>
    </Form>
    </Layout>}
    </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      error: state.error,
      type: state.user_type,
  }
}

const mapDispatchToProps = dispatch => {
  return {
      onAuth: (username, password, type,callback) => dispatch(actions.authLogin(username, password, type, callback)) 
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login))