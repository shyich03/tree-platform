import React, { useState, useEffect } from "react"
import SearchForm from "./SearchForm"
import SearchMap from "./SearchMap"
import TempImg from "./TempImg"
import { Form, Input, Modal, Button, InputNumber, Spin, Row } from 'antd';

const NewAddForm = ({ showAddModal, onCancel }) => {

    const [showMap, setShowMap] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [lat, setLat] = useState(5.5)
    const [lng, setLng] = useState(5.5)


    const onSubmit = () => {
        setShowImage(false)
        setShowMap(false)
        // if (showMap) {
        //     setShowMap(false)
        //     setShowImage(true)
        // } else if (showImage) {
        //     setShowImage(false)
        // } else {
        //     setShowMap(true)
        // }
    }

    const submitCoordinateFromMap = (top, left, right, bottom) => {
        setLat((top + bottom)/2)
        setLng((left +  right)/2)
        console.log(lat);
        console.log(lng);
        setShowMap(false)
        setShowImage(true)
    }

    const onFinish = (v) => {
        setLat(v.lat)
        setLng(v.long)
        setShowMap(true)
        console.log('Success:', v);
    }

    const onFinishFailed = (e) => {
        console.log('Failed:', e);
    }

    const submitCoordinateFromInput = (o) => {
        console.log(o)
        // setLat(lat)
        // setLng(lng)
        setShowMap(true)
    }

    const onReturn = () => {
        if (showMap) {
            setShowMap(false)
        } else if (showImage) {
            setShowMap(true)
            setShowImage(false)
        }
    }

    return (
        <Modal
            width="80%"
            visible={showAddModal}
            title="Title"
            footer={[
                <Button key="back" onClick={onCancel}>
                    Return
          </Button>,
                <Button key="submit" type="primary" onClick={onSubmit}>
                    Submit
          </Button>,
            ]}
        >

            {showMap ?
                <SearchMap lat={lat} lng={lat} onReturn={onReturn} onSubmit={submitCoordinateFromMap} />
                :
                showImage ?
                    <div
                        onDragStart={(e) => { e.preventDefault(); }}
                        style={{ position: "relative", "width": "100%", padding: "5%" }}>
                        <TempImg lat={lat} lng={lng} onSubmit={onSubmit} />
                    </div>
                    :
                    <SearchForm onReturn={onReturn} onFinishFailed={onFinishFailed} onFinish={onFinish} />
            }


        </Modal>
    )
}

export default NewAddForm
