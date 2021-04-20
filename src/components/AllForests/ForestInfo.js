import React, { useState, useRef, useEffect } from "react"
import { Descriptions, Row, Col, Divider, Button } from 'antd';
import { connect } from 'react-redux';
import file from '../../tree_info.pdf'
import 'antd/dist/antd.css';
import ForestRegionInfo from "./ForestRegionInfo";
import HansenImg from "./HansenImg";
import ForestMap from "./ForestMap";
import { List, Progress } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import CreateRegionForm from "./CreateRegionForm";
import FundingCap from '../ForestDetail/FundingCap'
import FundingChart from "./FundingChart";

const ForestInfo = ({ item, region, type, onOK }) => {

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

    const getFunding = (region) => {
        var funding = 0
        for (var i in region.funding) {
            funding = funding + region.funding[i].amount
        }
        return funding
    }


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
    console.log(type, item, region);
    const needRegionInfo = type == 'Auth' && item.state == 1
    const needFundingCap = type == 'Owner' && item.state == 2
    const colors = { 1: "green", 2: "red", 3: "blue" }
    return (
        <div>
            <p style={{ "fontSize": "25px" }}>{item.name} by <b>{item.organization_name}</b></p>
            { needRegionInfo ?
                <CreateRegionForm item={item} onOK={onOK} /> :
                <div>

                    <div style={{ position: "relative", marginBottom: "20px" }} >
                        <Row>
                            <Col span={12}>
                                <img
                                    draggable="false"
                                    onLoad={calculateSize}
                                    src={item.maps_image}
                                    ref={imgRef}
                                    style={{ "width": "100%", zIndex: "1" }} />
                            </Col>
                            <Col span={12}>
                                {item.state == 3 && <FundingChart region={region} />}
                            </Col>
                        </Row>
                        <div>
                            <Button style={{ margin: "10px 0 -15px 0" }} onClick={() => setShowHansenImg(true)}>Hansen Dataset Image</Button>
                            <Button style={{ marginLeft: "10px" }} onClick={() => setShowForestMap(true)}>Show Google Map</Button>
                            {/* <Button href={item.metadata_file} download>{item.metadata_file.substring(item.metadata_file.indexOf('/files/')+7)}</Button> */}
                            <Button type="primary" style={{ marginLeft: "10px" }} href={item.metadata_file} download>{"Download Forest Info File"}</Button>
                        </div>
                        {region.lenght != 0 &&
                            <>
                                <Divider orientation="left">Project Region Info</Divider>
                                {/* <Row > */}
                                {[...Array(region.length).keys()].map(i =>
                                    <div key={i}>
                                        {needFundingCap && <FundingCap forest={item} region={region[i]} onOK={onOK}></FundingCap>}
                                        <ForestRegionInfo color={i + 1} region={region[i]} size={size} type={type} />
                                        {item.state == 3 &&
                                            <>
                                                <h4>Funding Progress:</h4>
                                                <Progress progress='value' color={colors[i + 1]} value={getFunding(region[i])} total={region[i].funding_goal} />
                                            </>
                                        }
                                    </div>)}
                            </>
                        }
                    </div>
                </div>

            }
            <HansenImg hansenImg={item.gee_image} showImgModel={showHansenImg} onCancel={() => setShowHansenImg(false)} />
            <ForestMap showForestMap={showForestMap} name={item.name} lat1={item.lat1} lat2={item.lat2}
                lng1={item.long1} lng2={item.long2} zoom={10} onCancel={() => setShowForestMap(false)} />
        </div >
    )
}
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        type: state.user_type
    }
}

export default connect(mapStateToProps)(ForestInfo)
