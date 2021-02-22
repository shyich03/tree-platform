import React from 'react'
import { Form, Input, InputNumber, Button } from 'antd';

const SearchForm = ({ onReturn, onFinish, onFinishFailed }) => {

    const buttonStyle = {
        float: "right",
        marginLeft: "30px"
    }

    return (
        <Form
            style={{ width: '100%' }}
            onFinish={onFinish}
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
                name="lat"
                label="latitude"
                rules={[
                    {
                        required: true,
                        message: 'Please input latitude',
                    },
                    {
                        type: "number",
                        message: "must be number"
                    }
                ]}
            >
                <InputNumber />
            </Form.Item>
            <Form.Item
                name="long"
                label="longitude"
                rules={[
                    {
                        required: true,
                        message: 'Please input longitude',
                    },
                    {
                        type: "number",
                        message: "must be number"
                    }
                ]}
            >
                <InputNumber />
            </Form.Item>

            <Form.Item>
                <Button style={buttonStyle} key="submit" htmlType="submit" type="primary">
                    Submit
          </Button>
                <Button style={buttonStyle} key="back" onClick={onReturn}>
                    Back
          </Button>
            </Form.Item>

        </Form>
    )
}

export default SearchForm
