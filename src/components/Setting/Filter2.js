import React, { useState } from "react"
import { Modal, Slider, Switch, Row, Col, Select, Checkbox, Button } from 'antd';

const { Option } = Select;

const level = ["low", "Med", "High", "Very High", "Prelim", "In House", "3rd Party"]

const children = [];

var item;
for (item in level) {
    children.push(<Option key={level[item]}>{level[item]}</Option>);
}


const Filter2 = ({ showPreferenceSetting, onCancel, onSwitchChange, preferenceDisables, preference }) => {

    const attributes = ["Biodiversity benefit", "Livelihood benefit", "Local benefit", "Carbon credit status", "Minised leakage"]



    const scope = ["Domestic", "International"]
    const solution = ["Nature Based"]

    const [check, setCheck] = useState(false)



    const handleChange = (value) => {
        // console.log(`Selected: ${value}`);
    }


    return (
        <Modal
            width="50%"
            visible={showPreferenceSetting}
            title="Filter"
            footer={null}
            onCancel={onCancel}
            // onLoad={console.log("load")}
        >
            <h4>Biodiversity benefit</h4>
            <Select
                mode="multiple"
                size={"small"}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleChange}
                style={{ width: '100%' }}
            >
                {children}
            </Select>

            <h4 style={{ marginTop: "20px" }}>Livelihood benefit</h4>
            <Select
                mode="multiple"
                size={"small"}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleChange}
                style={{ width: '100%' }}
            >
                {children}
            </Select>

            <h4 style={{ marginTop: "20px" }}>Local benefit</h4>
            <Select
                mode="multiple"
                size={"small"}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleChange}
                style={{ width: '100%' }}
            >
                {children}
            </Select>

            <h4 style={{ marginTop: "20px" }} >Carbon credit status</h4>
            <Select
                mode="multiple"
                size={"small"}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleChange}
                style={{ width: '100%' }}
            >
                {children}
            </Select>

            <h4 style={{ marginTop: "20px" }} >Carbon sequestration per hectare (Mg/ha)</h4>
            <Slider range min={0} max={10000} defaultValue={[3000, 5000]} disabled={false} />

            <h4 style={{ marginTop: "20px" }}>Minised leakage</h4>
            <Select
                mode="multiple"
                size={"small"}
                placeholder="Please select"
                defaultValue={[]}
                onChange={handleChange}
                style={{ width: '100%' }}
            >
                {children}
            </Select>
            <Row>
                <Col style={{ marginTop: "20px" }} span={12}>
                    <Checkbox onChange={handleChange}>Domestic</Checkbox>
                </Col>

                <Col style={{ marginTop: "20px" }} span={12}>
                    <Checkbox onChange={handleChange}>International</Checkbox>
                </Col>

                <Col style={{ marginTop: "20px" }} span={24}>
                    <Checkbox onChange={handleChange}>Nature Based</Checkbox>
                </Col>
            </Row>

            <Button type="primary" style={{ float: "center", marginTop: "50px", marginLeft: "40%" }}>Filter</Button>
        </Modal>
    )
}

export default Filter2
