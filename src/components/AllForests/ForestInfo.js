import React, { useState, useRef, useEffect } from "react"
import { Descriptions, Row, Col, Divider, Button } from 'antd';
import file from '../../tree_info.pdf'

import 'antd/dist/antd.css';
import ForestRegionInfo from "./ForestRegionInfo";
import HansenImg from "./HansenImg";
import ForestMap from "./ForestMap";

const ForestInfo = ({ item, region }) => {

    // console.log("1222222222222222")
    // console.log(region)


    const [size, setSize] = useState(50)
    const [showHansenImg, setShowHansenImg] = useState(false)
    const [showForestMap, setShowForestMap] = useState(false)

    const imgRef = useRef()

    useEffect(() => {
        calculateSize()
        const resizeListener = () => {
            calculateSize()
        };
        // const clickListener = () => {
        //     calculateSize()
        //     // console.log(calculateSize())
        // };
        window.addEventListener('resize', resizeListener);
        // window.addEventListener('click', clickListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])


    const calculateSize = () => {
        // // console.log(size+ "$$$$$$$$$$$$$$$$$$$$$$$$")
        if (imgRef.current) {
            var rect = imgRef.current.getBoundingClientRect()
            var height = rect.height == 0 ? rect.width : rect.height
            // var height = rect.height
            var width = rect.width
            var size = Math.ceil(Math.sqrt(height * width / 200))
            setSize(size)
            // // console.log(height + "+++" + width)
            // console.log(rect)
            return { size }
        }
        return (1000)
    }



    return (
        <div>
            <div style={{ position: "relative", marginBottom: "20px" }} >
                <img
                    draggable="false"
                    onLoad={calculateSize}
                    src={item.maps_image}
                    ref={imgRef}
                    style={{ "width": "50%", zIndex: "1" }} />
                <div>
                    <Button style={{ margin: "10px 0 -15px 0" }} onClick={() => setShowHansenImg(true)}>Hansen Dataset Image</Button>
                    <Button style={{ marginLeft: "10px" }} onClick={() => setShowForestMap(true)}>Show Google Map</Button>
                    {/* <Button href={item.metadata_file} download>{item.metadata_file.substring(item.metadata_file.indexOf('/files/')+7)}</Button> */}
                    <Button type="primary" style={{ marginLeft: "10px" }} href={item.metadata_file} download>{"Download Forest Info File"}</Button>
                </div>
                {region.lenght != 0 &&
                    <>
                        <Divider orientation="left">Forest Region Info</Divider>
                        <Row >
                            <ForestRegionInfo color={1} region={region[0]} size={size} />
                            <ForestRegionInfo color={2} region={region[1]} size={size} />
                            <ForestRegionInfo color={3} region={region[2]} size={size} />
                        </Row>
                    </>
                }

            </div>
            <HansenImg hansenImg={item.gee_image} showImgModel={showHansenImg} onCancel={() => setShowHansenImg(false)} />
            <ForestMap showForestMap={showForestMap} name={item.name} lat1={item.lat1} lat2={item.lat2}
                lng1={item.long1} lng2={item.long2} zoom={10} onCancel={() => setShowForestMap(false)} />
        </div >
    )
}

export default ForestInfo
