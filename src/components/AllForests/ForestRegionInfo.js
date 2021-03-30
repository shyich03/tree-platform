import React from 'react'
import ColorBox from '../ForestDetail/ColorBox'
import 'antd/dist/antd.css';
import { Row, Col, Descriptions, Button } from 'antd';
import { withRouter } from 'react-router-dom';
import { Progress } from 'semantic-ui-react'
import { data, choiceMapping, tidyName } from '../Util/AttributeData'

const ForestRegionInfo = withRouter(({ history, color, region, size, }) => {

    const toInt = (s) => {
        s = s.slice(2, -2)
        s = s.split("], [")
        s.map((item, i) => {
            s[i] = item.split(", ").map(s => +s)
        })
        return s
    }
    const onClickFund = (id) => {
        history.push({
            pathname: "/funding/" + id
        })
    }
    return (
        <div>
            {region && region.area && toInt(region.area).map((item, i) => {
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
            {region && <Col span={24}>
                <Descriptions title={"Region " + color.toString()} bordered>
                    {data['strAttr'].map((item, i) =>
                        <Descriptions.Item key={i} span={3} label={tidyName(item)}>{region[item]}</Descriptions.Item>)}
                    {data['intAttr'].map((item, i) =>
                        <Descriptions.Item key={i} span={3} label={tidyName(item)}>{choiceMapping[region[item]]}</Descriptions.Item>)}
                    {/* need update */}
                    {data['checkAttr'].map((item, i) =>
                        <Descriptions.Item key={i} span={3} label={tidyName(item)}>{region[item] ? "True" : "False"}</Descriptions.Item>)}
                    {data['floatAttr'].map((item, i) =>
                        <Descriptions.Item key={i} span={3} label={tidyName(item)}>{region[item]}</Descriptions.Item>)}
                    {data['fundingAttr'].map((item, i) =>
                        <Descriptions.Item key={i} span={3} label={tidyName(item)}>{region[item]}</Descriptions.Item>)}
                </Descriptions>
                <Button style={{ float: "right", margin: "0px 30px" }} onClick={() => onClickFund(region.id)}>Fund</Button>

            </Col>}
        </div>
    )
})

export default ForestRegionInfo
