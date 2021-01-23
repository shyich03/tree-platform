import React, {Component}from 'react';
import { Form,  InputNumber,  Col} from 'antd';
export default class RegionForm extends Component{
render(){
    var labels = ["attr1", "attr2","attr3","attr4"]


    return(
        <Col span={8}>
        <Form ref={this.props.formRef}>
        {labels.map(item =>
        <Form.Item
            name={item}
            label={item} 
            rules={[
                {
                    type:"number",
                    message:"must be number"
                }
                ]}
            >
                <InputNumber min={1} max={10}/>
        </Form.Item>)}
        </Form>
        </Col>
    )
}}