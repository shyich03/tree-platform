import React, { useState, useCallback, useRef, useEffect, cloneElement } from "react"
import ColorBox from '../ForestDetail/ColorBox'
import { Descriptions, Image } from 'antd';
import { api } from '../../apis'
import 'antd/dist/antd.css';

const ForestInfo = ({ item, region }) => {

    console.log("1222222222222222")
    console.log(region[0].area)
    console.log("122331111111111111111111")

    // call resize before switching
    
    const toInt = (s) => {
        s = s.slice(2, -2)
        s = s.split("], [")
        s.map((item, i) => {
            s[i] = item.split(", ").map(s => +s)
        })
        console.log(s)
        return s
        
    }

    const [state, setState] = useState([
        {
            height: 0,
            width: 0,
            size: 1,
            iMax: 100,
            jMax: 100,
        }
    ])

    const imgRef = useRef()

    useEffect(() => {
        const resizeListener = () => {
            calculateSize()
        };
        window.addEventListener('resize', resizeListener);

        return () => {
            window.removeEventListener('resize', resizeListener);
        }
    }, [])


    const calculateSize = () => {
        if (imgRef.current) {
            var rect = imgRef.current.getBoundingClientRect()
            var height = rect.height
            var width = rect.width
            var size = Math.ceil(Math.sqrt(height * width / 200))
            var iMax = Math.ceil(height / size)
            var jMax = Math.ceil(width / size)
            setState({
                size: size,
                width: width,
                height: height,
                iMax: iMax,
                jMax: jMax
            })
            return { iMax, jMax }
        } else {
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

                {/* <Image src={item.gee_image} width={width} /> */}

                {region.length != 0 && toInt(region[0].area).map((item, i) => {
                    return (item.map((item, j) => {
                        return (
                            
                            item!=0 && <ColorBox
                                colorCode={item}
                                size={state.size}
                                top={i * state.size}
                                left={j * state.size}
                                key={i * state.jMax + j}
                                onDragStart={(e) => { e.preventDefault(); }} />
                            
                        )
                    }))
                })}

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
                    <Descriptions.Item label="Attribute 4">{state.size}</Descriptions.Item>
                    <Descriptions.Item label="Attribute 4">{state.size}</Descriptions.Item>

                    <Descriptions.Item label="Description">{region[0].description}</Descriptions.Item>
                    <Descriptions.Item label="Description">{region[1].description}</Descriptions.Item>
                    <Descriptions.Item label="Description">{region[2].description}</Descriptions.Item>
                </Descriptions>}
        </div>
    )
}

export default ForestInfo
