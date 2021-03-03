import React from 'react'
import { Modal, Button } from 'antd';

const HansenImg = ({ hansenImg, showImgModel, onCancel }) => {
    return (
        <Modal
            width="60%"
            visible={showImgModel}
            title="Hansen Dataset Image"
            footer={null}
            onCancel={onCancel}
        >
            <img
                draggable="false"
                src={hansenImg}
                style={{ "width": "100%" }}
            />

        </Modal>
    )
}

export default HansenImg
