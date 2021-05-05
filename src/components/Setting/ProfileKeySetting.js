import React, { useState, useEffect } from "react"
import { Modal, Switch, Row, Col, Input} from 'antd';
import { api } from '../../apis'
import { connect } from 'react-redux';

const ProfileKeySetting = ({ showKeySetting, onCancel , token }) => {

    const [notProvideKey, setNotProvideKey] = useState(true)
    const [address, setAddress] = useState('')
    const [userID, setUserID] = useState('')
    useEffect( () => {
        const fetch = async()=>{
            console.log(token);
            var res = await api.get('funder',
            {
                headers: {
                    'Authorization': token
                }
            })
            console.log(res);
            var data = res.data[0]
            setNotProvideKey(data.use_address)
            setAddress(data.algo_address)
            setUserID(data.user)
        }
        fetch()
    },[])
    const onChangeSwith = (change) => {
        setNotProvideKey(!notProvideKey)
    }

    const onChangeInput = (v) =>{
        // console.log(v);
        setAddress(v.target.value)
    }
    const onOk = async() => {
        var res = await api.patch(`funder/${userID}/`,
        {
            'algo_address': address,
            'use_address': !notProvideKey
        },
        {
            headers: {
                'Authorization': token
            }
        })
        onCancel()
    }

    return (
        <Modal
            width="50%"
            visible={showKeySetting}
            title="Public Key Setting"
            onCancel={onCancel}
            onOk={onOk}
        // onLoad={console.log("load")}
        >
            <h4>Public Key</h4>
            <Row>
                <Col span={12}>
                    <Input defaultValue={address} disabled={!notProvideKey} onChange={onChangeInput}/>
                </Col>
                <Col span={12}>
                <Switch style={{ margin: "0 0 0 15px" }} defaultChecked={notProvideKey} onChange={(c) => onChangeSwith(c)} />
                </Col>
            </Row>
        </Modal>
    )
}
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        type: state.user_type,
        token: state.token
    }
}
export default connect(mapStateToProps)(ProfileKeySetting)
