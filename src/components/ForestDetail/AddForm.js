import React, {Component}from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Modal,Button} from 'antd';
import {api} from '../../apis'

export default class AddForm extends Component{
    render(){
        const {showAddModal, onCancel, onOK} = this.props
    
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
        const submitFrom = (v)=>{
            console.log("submit", v);
            var res = api.post('forest/', 
                {
                    ...v,
                    
                })
            console.log(res);

        }
        return(
            <Modal 
                title="Add Forest"
                visible={showAddModal}
                width="80%"
                onCancel={onCancel} 
                footer={null}>
            <Form
                style={{width: '80%', margin:"150px auto"}}
                {...this.layout}
                name="basic"
                onFinish={submitFrom}
                onFinishFailed={onFinishFailed}
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
                name="desc"
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
                <Input/>
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
                <Input/>
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
                <Input/>
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
                <Input/>
            </Form.Item>

            <Form.Item>
                <Button  type="primary" htmlType="submit" className="login-form-button">
                Submit
                </Button>
                Or <Button type="primary" onClick={onCancel}>Cancel</Button>
            </Form.Item>
            </Form>
            
            </Modal>
        )
    }
}