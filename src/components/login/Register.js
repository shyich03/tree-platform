import React, {Component}from 'react';
import 'antd/dist/antd.css';
import {Layout, Form, Input, Button, Checkbox } from 'antd';
import { withRouter } from "react-router-dom";
import {  MailOutlined, UserOutlined, LockOutlined  } from '@ant-design/icons';
import * as actions from '../../store/actions/auth';
import { connect } from 'react-redux';

class Register extends Component{
  
  
//   componentDidMount(){
//     console.log("regid mount")
//   }
//   componentWillUnmount(){
//     console.log("login unmount")
//   }
  
  render() {
    const onFinish = (values) => {
      const {history, onAuth,type} = this.props
      onAuth(values, type)
      console.log('Success:', values);
      history.push({
        pathname : "/"+type+"login",
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
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
          <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email"/>
      </Form.Item>
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
      <Form.Item
        name="confirm-password"
        rules={[
          {
            required: true,
            message: 'Please confirm your Password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Confirm password"
        />
      </Form.Item>
      {this.props.type=='Owner'?
        <Form.Item
          name="paypal_email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ]}
        >
        <Input placeholder="paypal email"/>
      
        </Form.Item>:
        ""
      }

      <Form.Item>
        <Button style={{width:"100%"}} type="primary" htmlType="submit" className="login-form-button">
            Register
        </Button>
        {/* <Button onClick={onFinish}> 
          test
        </Button> */}
      </Form.Item>
    </Form>
    </Layout>
    );
  };
}
const mapStateToProps = (state) => {
  return {
      loading: state.loading,
      error: state.error
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (values, type) => dispatch(actions.authSignup(values, type)) 
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Register))