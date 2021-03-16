import React, { useState } from "react"
import { Modal, Slider, Switch, Row, Col, Select, Checkbox, Button } from 'antd';

const { Option } = Select;

const level = ["Low", "Med", "High", "Very high", "Prelim", "In house", "3rd party"]

const children = [];

var item;
for (item in level) {
    children.push(<Option key={level[item]}>{level[item]}</Option>);
}


const Filter2 = ({ showPreferenceSetting, onCancel, onSubmit, preference}) => {

    var tempPreference = preference

    const attributes = ["Biodiversity benefit", "Livelihood benefit", "Local benefit", "Carbon credit status", "Minised leakage"]



    const scope = ["Domestic", "International"]
    const solution = ["Nature Based", "Non-Nature Based"]

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
                defaultValue={preference.biodiversity_benefit}
                onChange={(change) => tempPreference.biodiversity_benefit = change}
                style={{ width: '100%' }}
            >
                {children}
            </Select>

            <h4 style={{ marginTop: "20px" }}>Livelihood benefit</h4>
            <Select
                mode="multiple"
                size={"small"}
                placeholder="Please select"
                defaultValue={preference.livelihood_benefit}
                onChange={(change) => tempPreference.livelihood_benefit = change}
                style={{ width: '100%' }}
            >
                {children}
            </Select>

            <h4 style={{ marginTop: "20px" }}>Local benefit</h4>
            <Select
                mode="multiple"
                size={"small"}
                placeholder="Please select"
                defaultValue={preference.local_benefit}
                onChange={(change) => tempPreference.local_benefit = change}
                style={{ width: '100%' }}
            >
                {children}
            </Select>

            <h4 style={{ marginTop: "20px" }} >Carbon credit status</h4>
            <Select
                mode="multiple"
                size={"small"}
                placeholder="Please select"
                defaultValue={preference.carbon_credit_status}
                onChange={(change) => tempPreference.carbon_credit_status = change}
                style={{ width: '100%' }}
            >
                {children}
            </Select>

            <h4 style={{ marginTop: "20px" }} >Carbon sequestration per hectare (Mg/ha)</h4>
            <Slider range min={0} max={10000} onChange={(change) => tempPreference.carbon_sequestration = change} defaultValue={preference.carbon_sequestration} disabled={false} />

            <h4 style={{ marginTop: "20px" }}>Minised leakage</h4>
            <Select
                mode="multiple"
                size={"small"}
                placeholder="Please select"
                defaultValue={preference.minised_leakage}
                onChange={(change) => tempPreference.minised_leakage = change}
                style={{ width: '100%' }}
            >
                {children}
            </Select>
            <Row>
                <Col style={{ marginTop: "20px" }} span={12}>
                    <Checkbox defaultChecked={preference.domestic} onChange={(e)=> tempPreference.domestic = e.target.checked}>Domestic</Checkbox>
                </Col>

                <Col style={{ marginTop: "20px" }} span={12}>
                    <Checkbox defaultChecked={preference.international} onChange={(e)=> tempPreference.international = e.target.checked}>International</Checkbox>
                </Col>

                <Col style={{ marginTop: "20px" }} span={12}>
                    <Checkbox defaultChecked={preference.nature_based} onChange={(e)=> tempPreference.nature_based = e.target.checked}>Nature Based</Checkbox>
                </Col>
                <Col style={{ marginTop: "20px" }} span={12}>
                    <Checkbox defaultChecked={preference.non_nature_based} onChange={(e)=> tempPreference.non_nature_based = e.target.checked}>Non-Nature Based</Checkbox>
                </Col>
            </Row>

            <Button type="primary" onClick={() => onSubmit(tempPreference)} style={{ float: "center", marginTop: "50px", marginLeft: "40%" }}>Filter</Button>
        </Modal>
    )
}

export default Filter2
