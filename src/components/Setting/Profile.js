import React, { useState } from "react"
import { Modal, Slider, Switch, Row, Col, Select, Checkbox, Button, Input } from 'antd';
import ProfileMainPage from "./ProfileMainPage";
import ProfileKeySetting from "./ProfileKeySetting";
import OrgSetting from "./OrgSetting";

const Profile = ({ showProfile, onCancel, onOk, type }) => {

    const [showProfileMainPage, setShowProfileMainPage] = useState(true)

    const [showOrgSetting, setShowOrgSetting] = useState(false)

    const [showKeySetting, setshowKeySetting] = useState(false)

    const onSelect = (select) =>{
        if(select=="org_name"){
            setShowProfileMainPage(false)
            setShowOrgSetting(true)
        } else if (select == "public_key") {
            setShowProfileMainPage(false)
            setshowKeySetting(true)
        }
    }

    const onBack = () =>{
        setshowKeySetting(false)
        setShowOrgSetting(false)
        setShowProfileMainPage(true)
    }

    return (
        <>
            <ProfileMainPage showProfileMainPage={showProfileMainPage && showProfile} onCancel={onCancel} onSelect={onSelect} type={type}/>
            <ProfileKeySetting showKeySetting={showKeySetting} onCancel={onBack}/>
            <OrgSetting showOrgSetting={showOrgSetting} onCancel={onBack}/>
        </>
    )
}

export default Profile
