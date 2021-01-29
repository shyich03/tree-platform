import React from 'react'
import ColorBox from '../ForestDetail/ColorBox'
import { Descriptions, Image } from 'antd';
import { api } from '../../apis'
import 'antd/dist/antd.css';

const ForestInfo = ({ item, region }) => {
    console.log("1222222222222222")
    console.log(region)
    console.log("122331111111111111111111")

    return (
        <div>
            <Image src={item.gee_image} width={900} />
            <Descriptions title="Forest discription">
                <Descriptions.Item label="0">{ region.length==0 ? "" : region[0].description }</Descriptions.Item>
                <Descriptions.Item label="1">{ region.length==0 ? "" : region[1].description }</Descriptions.Item>
                <Descriptions.Item label="2">{ region.length==0 ? "" : region[2].description }</Descriptions.Item>
            </Descriptions>,
        </div>
    )
}

export default ForestInfo
