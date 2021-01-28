import React, {Component}from 'react';
import { Form,  InputNumber,  Col, Input} from 'antd';
export default class RegionForm extends Component{
render(){
    const {data, onChange, id}=this.props
    console.log(Object.keys(data));
    const onValuesChange=(changedFields, allFields)=>{
        console.log(changedFields,allFields);
        onChange(id, allFields)
    }
    console.log(data instanceof Set);
    return(
        <Col span={8}>
        <Form ref={this.props.formRef} onValuesChange={onValuesChange}>
        {Object.keys(data).map((item, index) =>item==="description"?
        <Form.Item
            key={index}
            name={item}
            label={item} 
            rules={[
                {
                    type:"string",
                    message:"must be string"
                }
                ]}
            >
                <Input/>
        </Form.Item>:
        <Form.Item
            key={index}
            name={item}
            label={item} 
            rules={[
                {
                    type:"number",
                    message:"must be number"
                }
                ]}
            >
                <InputNumber min={0} max={10}/>
        </Form.Item>)}
        </Form>
        </Col>
    )
}}