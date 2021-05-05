import React, { useState } from "react"
import { Modal, Slider, Switch, Row, Col, Select, Checkbox, Button, Input } from 'antd';

const ProfileMainPage = ({ showProfileMainPage, onCancel, onSelect, type }) => {
    return (
        <Modal
            width="50%"
            visible={showProfileMainPage}
            title="Profile Setting"
            onCancel={onCancel}
            onOk={() => { console.log("123"); onCancel()}}
        // onLoad={console.log("load")}
        >

            <>

                <Row
                    style={{ margin: "0 0 0 30px" }}
                >

                    {type == "Owner" &&
                        <Col span={12}>
                            <Button onClick={() => onSelect("org_name")}>Organization Name</Button>
                        </Col>
                    }

                    {type == "Funder" &&
                        <Col span={12}>
                            <Button onClick={() => onSelect("public_key")}>Public Key</Button>
                        </Col>
                    }

                    <Col span={12}>
                        <Button>Button</Button>
                    </Col>

                </Row>

                <Row
                    style={{ margin: "25px 0 0 30px" }}>

                    <Col span={12}>
                        <Button>Button</Button>
                    </Col>

                    <Col span={12}>
                        <Button>Button</Button>
                    </Col>

                </Row>

            </>

        </Modal>
    )
}

export default ProfileMainPage
