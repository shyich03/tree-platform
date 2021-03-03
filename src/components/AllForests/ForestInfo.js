import React, { useState, useRef, useEffect } from "react"
import { Descriptions, Row, Col, Divider } from 'antd';
import file from '../../tree_info.pdf'

import 'antd/dist/antd.css';
import ForestRegionInfo from "./ForestRegionInfo";

const ForestInfo = ({ item, region }) => {

    // console.log("1222222222222222")
    // console.log(region)


    const [size, setSize] = useState(50)

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
                {region.lenght != 0 &&
                    <>
                        <Divider orientation="left">Forest Region Info</Divider>
                        <a href={file} download>tree_info</a>
                        <Row >
                            <ForestRegionInfo color={1} region={region[0]} size={size} />
                            <ForestRegionInfo color={2} region={region[1]} size={size} />
                            <ForestRegionInfo color={3} region={region[2]} size={size} />
                        </Row>
                    </>
                }

            </div>
        </div >
    )
}

export default ForestInfo
