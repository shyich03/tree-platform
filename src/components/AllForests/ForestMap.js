import React, { useState, useCallback, useRef } from "react"
import { GoogleMap, LoadScript, Marker , useJsApiLoader } from '@react-google-maps/api';
import { Modal, Button } from 'antd';

const ForestMap = ({ showForestMap, name, lat1, lat2, lng1, lng2, zoom, onCancel }) => {

    const { REACT_APP_GOOGLE_KEY } = process.env

    const center = {
        lat: (lat1 + lat2) / 2,
        lng: (lng1 + lng2) / 2
    }

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: `${REACT_APP_GOOGLE_KEY}`
      })

 return isLoaded ? (

        <Modal
            width="60%"
            visible={showForestMap}
            title={name}
            footer={null}
            onCancel={onCancel}
        >
            <div style={{ height: '80vh', width: '100%' }}>
                    <GoogleMap
                        mapContainerStyle={{
                            width: '100%',
                            height: '90%'
                        }}
                        center={center}
                        zoom={zoom}
                    >
                        <Marker
                            position={center}
                        />
                    </GoogleMap>
            </div>
        </Modal >
    ) : <></>
}

export default ForestMap
