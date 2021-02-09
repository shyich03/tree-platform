import React from 'react'
import { Form, Input, InputNumber, Button } from 'antd';

const SearchForm = ({ onReturn, onFinish, onFinishFailed }) => {
    return (
        <Form
            style={{ width: '80%' }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            {/* <Form.Item
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
            </Form.Item> */}
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
                <Button key="back" onClick={onReturn}>
                    Return
          </Button>
                <Button key="submit" htmlType="submit" type="primary">
                    Submit
          </Button>
            </Form.Item>

        </Form>
    )
}

export default SearchForm
