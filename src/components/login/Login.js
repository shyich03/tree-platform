import React, {Component}from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import {Layout, Form, Input, Button, Checkbox } from 'antd';
import {BrowserRouter as Router, Link, Switch, Route, replace, withRouter } from "react-router-dom";
import Routes from "../../Routes";
import {  UserOutlined, LockOutlined  } from '@ant-design/icons';

class Login extends Component{
  
  
  componentDidMount(){
    console.log("login mount")
  }
  componentWillUnmount(){
    console.log("login unmount")
  }
  
  render() {
    const onFinish = (values) => {
      const {history} = this.props
      console.log('Success:', values);
      history.push({
        pathname : "/overview",
        state: {type: this.props.type}
      })
    };

    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

    return (
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
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
    </Layout>
    );
  };
}
export default withRouter(Login)