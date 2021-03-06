import React, { useState } from "react"
import { Modal, Slider, Switch, Row, Col, Select, Checkbox , Button } from 'antd';

const Filter = ({ showPreferenceSetting, onCancel, onSwitchChange, preferenceDisables, preference }) => {

    const attributes = ["Biodiversity benefit", "Livelihood benefit", "Local benefit", "Carbon credit status", "Minised leakage"]

    const scope = ["Domestic", "International"]
    const solution = ["Nature Based"]

    const [check, setCheck] = useState(false)

    const { Option } = Select;
    const handleChange = () => {

    }


    return (
        <Modal
            width="50%"
            visible={showPreferenceSetting}
            title="Filter"
            footer={null}
            onCancel={onCancel}
            onLoad={console.log("load")}
        >
            {/* <Row>
                <Col span={12}><h4>Carbon credit status</h4></Col>
                <Col span={4}><Switch size="small" checked={preferenceDisables[0]} onChange={() => { onSwitchChange(0) }} /></Col>
                <Col span={24}><Slider min={-10} max={10} defaultValue={3} disabled={preferenceDisables[0]} onChange={value => { console.log(value) }} /> </Col>
            </Row> */}
            <div
                
            >
                <Row >
                    <Col span={12}>
                    <h4>Biodiversity benefit</h4>
                        <Select
                        defaultValue={''}
                        style={{ width: 150}}
                        onChange={handleChange}
                    >
                        <Option value=""></Option>
                        <Option value="Low">Low</Option>
                        <Option value="Med">Med</Option>
                        <Option value="High">High</Option>
                        <Option value="Veryhigh">Very high</Option>
                        <Option value="Inhouse">In house</Option>
                        <Option value="Prelim">Prelim</Option>
                        <Option value="3rdparty">3rd party</Option>
                    </Select></Col>
                   
                    <Col span={12}>
                    <h4>Livelihood benefit</h4>
                        <Select
                        defaultValue={''}
                        style={{ width: 150 }}
                        onChange={handleChange}
                    >
                        <Option value=""></Option>
                        <Option value="Low">Low</Option>
                        <Option value="Med">Med</Option>
                        <Option value="High">High</Option>
                        <Option value="Veryhigh">Very high</Option>
                        <Option value="Inhouse">In house</Option>
                        <Option value="Prelim">Prelim</Option>
                        <Option value="3rdparty">3rd party</Option>
                    </Select></Col>
                    <Col span={12}>
                    <h4>Local benefit</h4>
                        <Select
                        defaultValue={''}
                        style={{ width: 150 }}
                        onChange={handleChange}
                    >
                        <Option value=""></Option>
                        <Option value="Low">Low</Option>
                        <Option value="Med">Med</Option>
                        <Option value="High">High</Option>
                        <Option value="Veryhigh">Very high</Option>
                        <Option value="Inhouse">In house</Option>
                        <Option value="Prelim">Prelim</Option>
                        <Option value="3rdparty">3rd party</Option>
                    </Select></Col>
                    <Col span={12}>
                    <h4>Carbon credit status</h4>
                        <Select
                        defaultValue={''}
                        style={{ width: 150 }}
                        onChange={handleChange}
                    >
                        <Option value=""></Option>
                        <Option value="Low">Low</Option>
                        <Option value="Med">Med</Option>
                        <Option value="High">High</Option>
                        <Option value="Veryhigh">Very high</Option>
                        <Option value="Inhouse">In house</Option>
                        <Option value="Prelim">Prelim</Option>
                        <Option value="3rdparty">3rd party</Option>
                    </Select></Col>
                    <Col span={24}>
                    <h4>Minised leakage</h4>
                        <Select
                        defaultValue={''}
                        style={{ width: 150 }}
                        onChange={handleChange}
                    >
                        <Option value=""></Option>
                        <Option value="Low">Low</Option>
                        <Option value="Med">Med</Option>
                        <Option value="High">High</Option>
                        <Option value="Veryhigh">Very high</Option>
                        <Option value="Inhouse">In house</Option>
                        <Option value="Prelim">Prelim</Option>
                        <Option value="3rdparty">3rd party</Option>
                    </Select></Col>


                    <Col style={{marginTop:"20px"}}span={12}>
                    <Checkbox onChange={console.log("change")}>Domestic</Checkbox>
                    </Col>

                    <Col style={{marginTop:"20px"}}span={12}>
                    <Checkbox onChange={console.log("change")}>International</Checkbox>
                    </Col>

                    <Col style={{marginTop:"20px"}}span={24}>
                    <Checkbox onChange={console.log("change")}>Nature Based</Checkbox>
                    </Col>
                </Row>
            </div>

            <Button type="primary" style={{ float: "center", marginTop: "50px", marginLeft: "40%" }}>Filter</Button>
        </Modal>
    )
}

export default Filter
