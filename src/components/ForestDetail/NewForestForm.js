import React, {Component}from 'react';
import { Form, Input, Button, InputNumber} from 'antd';

export default class NewForestForm extends Component{
render(){
    const buttonStyle = {
    float:"right",
    marginLeft:"30px"
}
    return(

   
<Form
    ref = {this.props.formRef}
    style={{width: '80%'}}
    onFinish={this.props.submitForm}
    onFinishFailed={this.props.onFinishFailed}
>
<Form.Item
    name="name"
    label="Forest name"
    rules={[
    {
        required: true,
        message: 'Please input forest name',
    },
    ]}
>
    <Input />
</Form.Item>
<Form.Item
    name="description"
    label="Forest description"
    rules={[
    {
        required: true,
        message: 'Please input forest description',
    },
    ]}
>
    <Input />
</Form.Item>
<Form.Item
    name="lat1"
    label="Top left latitude"
    rules={[
    {
        required: true,
        message: 'Please input top left latitude',
    },
    {
        type:"number",
        message:"must be number"
    }
    ]}
>
    <InputNumber/>
</Form.Item>
<Form.Item
    name="long1"
    label="Top left longitude"
    rules={[
    {
        required: true,
        message: 'Please input top left longitude',
    },
    {
        type:"number",
        message:"must be number"
    }
    ]}
>
    <InputNumber/>
</Form.Item>
<Form.Item
    name="lat2"
    label="Bottom right latitude"
    rules={[
    {
        required: true,
        message: 'Please input bottom right latitude',
    },
    {
        type:"number",
        message:"must be number"
    }
    ]}
>
    <InputNumber/>
</Form.Item>
<Form.Item
    name="long2"
    label="Bottom right longitude"
    rules={[
    {
        required: true,
        message: 'Please input bottom right longitude',
    },
    {
        type:"number",
        message:"must be number"
    }
    ]}
>
    <InputNumber/>
</Form.Item>

<Form.Item>
    <Button style={buttonStyle} type="primary" htmlType="submit" className="login-form-button">
    Submit
    </Button>
    <Button style={buttonStyle} type="primary" onClick={this.props.onCancel}>Cancel</Button>
</Form.Item>
</Form>
 )
}}