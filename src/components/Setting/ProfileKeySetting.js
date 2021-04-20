import React, { useState } from "react"
import { Modal, Slider, Switch, Row, Col, Select, Checkbox, Button, Input } from 'antd';

const ProfileKeySetting = ({ showKeySetting, onCancel }) => {

    const [notProvideKey, setNotProvideKey] = useState(true)

    const onChange = (change) => {
        setNotProvideKey(!notProvideKey)
    }


    const onOk = () => {
        
    }

    return (
        <Modal
            width="50%"
            visible={showKeySetting}
            title="Public Key Setting"
            onCancel={onCancel}
            onOk={() => { console.log("1234") }}
        // onLoad={console.log("load")}
        >
            <h4>Public Key</h4>
            <Row>
                <Col span={12}>
                    <Input disabled={notProvideKey}/>
                </Col>
                <Col span={12}>
                <Switch style={{ margin: "0 0 0 15px" }} defaultChecked={false} onChange={(c) => onChange(c)} />
                </Col>
            </Row>
        </Modal>
    )
}

export default ProfileKeySetting
