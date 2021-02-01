import React, { useState, useCallback, useRef, useEffect } from "react"
import { Descriptions } from 'antd';

import 'antd/dist/antd.css';
import ForestRegionInfo from "./ForestRegionInfo";

const ForestInfo = ({ item, region }) => {

    // console.log("1222222222222222")
    // console.log(region)
    // console.log("122331dfsd111111111111111111")


    const [size, setSize] = useState(50)

    const imgRef = useRef()

    useEffect(() => {
        const resizeListener = () => {
            calculateSize()
        };
        const clickListener = () => {
            calculateSize()
        };
        const loadListener = () => {
            calculateSize()
        };
        window.addEventListener('resize', resizeListener);
        window.addEventListener('load', loadListener);
        window.addEventListener('click', clickListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
            window.removeEventListener('load', loadListener);
        }
    }, [])

    const calculateSize = () => {
        if (imgRef.current) {
            var rect = imgRef.current.getBoundingClientRect()
            var height = rect.height
            var width = rect.width
            var size = Math.ceil(Math.sqrt(height * width / 200))
            setSize(size)
            var a = 0
            return { a, a }
        }
    }



    return (
        <div>
            <div style={{ position: "relative", marginBottom: "20px" }} >
                <img
                    draggable="false"
                    src={item.gee_image}
                    ref={imgRef}
                    style={{ "width": "100%", zIndex: "1" }} />
                {region.lenght != 0 &&
                    <>
                        <ForestRegionInfo color={1} area={region[0].area} size={size} />
                        <ForestRegionInfo color={2} area={region[1].area} size={size} />
                        <ForestRegionInfo color={3} area={region[2].area} size={size} />

                    </>
                }
                {/* {region.length != 0 && toInt(region[0].area).map((item, i) => {
                    console.log(size+ "1111111111111111111111")
                    return (item.map((item, j) => {
                        return (
                            item!=0 && <ColorBox
                                colorCode={item}
                                size={size}
                                top={i * size}
                                left={j * size}
                                key={i * 100 + j}
                                onDragStart={(e) => { e.preventDefault(); }} />
                            
                        )
                    }))
                })} */}

            </div>
            {region.length != 0 &&
                <Descriptions title="Forest discription">
                    <Descriptions.Item label="Attribute 1">{region[0].attr1}</Descriptions.Item>
                    <Descriptions.Item label="Attribute 1">{region[1].attr1}</Descriptions.Item>
                    <Descriptions.Item label="Attribute 1">{region[2].attr1}</Descriptions.Item>
                    <Descriptions.Item label="Attribute 2">{region[0].attr2}</Descriptions.Item>
                    <Descriptions.Item label="Attribute 2">{region[1].attr2}</Descriptions.Item>
                    <Descriptions.Item label="Attribute 2">{region[2].attr2}</Descriptions.Item>
                    <Descriptions.Item label="Attribute 3">{region[0].attr3}</Descriptions.Item>
                    <Descriptions.Item label="Attribute 3">{region[1].attr3}</Descriptions.Item>
                    <Descriptions.Item label="Attribute 3">{region[2].attr3}</Descriptions.Item>
                    <Descriptions.Item label="Attribute 4">{region[0].attr4}</Descriptions.Item>
                    <Descriptions.Item label="Attribute 4">{region[1].attr4}</Descriptions.Item>
                    <Descriptions.Item label="Attribute 4">{region[2].attr4}</Descriptions.Item>

                    <Descriptions.Item label="Description">{region[0].description}</Descriptions.Item>
                    <Descriptions.Item label="Description">{region[1].description}</Descriptions.Item>
                    <Descriptions.Item label="Description">{region[2].description}</Descriptions.Item>
                </Descriptions>}
        </div>
    )
}

export default ForestInfo
