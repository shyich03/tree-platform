import React, { useState } from "react"
import { Modal, Slider, Switch, Row, Col, Select, Checkbox, Button, Input } from 'antd';

const OrgSetting = ({ showOrgSetting, onCancel}) => {
    return (
        <Modal
            width="50%"
            visible={showOrgSetting}
            title="Organization Setting"
            onCancel={onCancel}
            onOk={() => { console.log("1234") }}
        >
            <h4>Organization Name</h4>
            <Input defaultValue="World Land Trust" />
        </Modal>
    )
}

export default OrgSetting
