import React, { useState, useEffect } from "react"
import SearchForm from "./SearchForm"
import SearchMap from "./SearchMap"
import { Form, Input, Modal, Button, InputNumber, Spin, Row } from 'antd';

const NewAddForm = ({ showAddModal, onCancel }) => {

    const [showMap, setShowMap] = useState(false)



    return (
        <Modal
            width="80%"
            visible={showAddModal}
            title="Title"
            footer={[
                <Button key="back" onClick={onCancel}>
                    Return
          </Button>,
                <Button key="submit" type="primary" onClick={() => { setShowMap(true) }}>
                    Submit
          </Button>,
            ]}
        >

            { !showMap ?
                <SearchForm /> :
                <SearchMap lat={6} lng={6}/>


            }


        </Modal>
    )
}

export default NewAddForm
