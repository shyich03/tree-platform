import React, { Component } from 'react';
import { Form, InputNumber, Col, Input , Select, Checkbox , Button} from 'antd';
import {data, choiceMapping, tidyName} from '../Util/AttributeData'
const { Option } = Select;

export default class RegionForm extends Component {
    render() {
        const { initialData, onChange, id } = this.props
        // console.log(Object.keys(data));
        const onValuesChange = (changedFields, allFields) => {
            console.log(changedFields, allFields);
        
            onChange(id, allFields)
        }
        
        console.log(Object.keys(choiceMapping));
        return (
            <Col span={8}>
                <Form 
                    ref={this.props.formRef} 
                    onValuesChange={onValuesChange} 
                    layout="vertical" 
                    initialValues={initialData}>
                    {data['intAttr'].map((item, index) => 
                        <Form.Item
                            key={index}
                            name={item}
                            label={item}
                        >
                            <Select
                                // defaultValue={choiceMapping[initialData[item]].toString()}
                                style={{ width: 150}}
                            >
                                {Object.keys(choiceMapping).map((item,index) =><Option key={index} value={parseInt(item)}>{choiceMapping[item]}</Option>)}
                                {/* <Option value={1}>Low</Option>
                                <Option value={2}>Med</Option>
                                <Option value={3}>High</Option>
                                <Option value={4}>Very high</Option>
                                <Option value={5}>In house</Option>
                                <Option value={6}>Prelim</Option>
                                <Option value={7}>3rd party</Option> */}
                                {/* <Option value=""></Option>
                                <Option value="low">Low</Option>
                                <Option value="med">Med</Option>
                                <Option value="high">High</Option>
                                <Option value="very high">Very high</Option>
                                <Option value="in house">In house</Option>
                                <Option value="prelim">Prelim</Option>
                                <Option value="3rd party">3rd party</Option> */}
                            </Select>
                            <Checkbox onChange={() => console.log("check")}>Informed Guess</Checkbox>
                        </Form.Item> )}
                    {data['floatAttr'].map((item, index) => 
                        <Form.Item
                            key={index}
                            name={item}
                            label={item}
                            rules={[
                                {
                                    type: "number",
                                    message: "must be number"
                                }
                            ]}
                        >
                            <InputNumber min={0} />
                        </Form.Item>)}
                    {data['checkAttr'].map((item, index) => 
                        <Form.Item
                            key={index}
                            name={item}
                            defaultChecked= {false}
                            valuePropName="checked">
                            <Checkbox 
                                >
                                {item}
                            </Checkbox>
                        </Form.Item>)}
                    {data['strAttr'].map((item, index) => 
                        <Form.Item
                            key={index}
                            name={item}
                            label={item}
                            rules={[
                                {
                                    type: "string",
                                    message: "must be string"
                                }
                            ]}
                        >
                            <Input />
                        </Form.Item>)}
                </Form>
            </Col>
        )
    }
}