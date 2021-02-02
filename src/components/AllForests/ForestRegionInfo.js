import React from 'react'
import ColorBox from '../ForestDetail/ColorBox'
import 'antd/dist/antd.css';
import { Row, Col, Descriptions } from 'antd';

const ForestRegionInfo = ({ color, region, size, }) => {

    const toInt = (s) => {
        s = s.slice(2, -2)
        s = s.split("], [")
        s.map((item, i) => {
            s[i] = item.split(", ").map(s => +s)
        })
        return s
    }

    return (
        <div>
            {region.area && toInt(region.area).map((item, i) => {
                return (item.map((item, j) => {
                    return (
                        item != 0 && <ColorBox
                            colorCode={color}
                            size={size}
                            top={i * size}
                            left={j * size}
                            key={i * 100 + j}
                            onDragStart={(e) => { e.preventDefault(); }} />

                    )
                }))
            })}
            <Col span={24}>
                <Descriptions title={"Region "+color.toString()} bordered>
                <Descriptions.Item span={3} label="attr1">{region.attr1}</Descriptions.Item>
                <Descriptions.Item span={3} label="attr2">{region.attr2}</Descriptions.Item>
                <Descriptions.Item span={3} label="attr3">{region.attr3}</Descriptions.Item>
                <Descriptions.Item span={3} label="attr4">{region.attr4}</Descriptions.Item>
                <Descriptions.Item span={3} label="description">{region.description}</Descriptions.Item>
                </Descriptions>,
            </Col>
        </div>
    )
}

export default ForestRegionInfo
