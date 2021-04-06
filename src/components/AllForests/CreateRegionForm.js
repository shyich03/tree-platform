import React, { useState, useEffect, useRef } from "react"
import { Modal, Button, Upload, Spin, Row } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { api } from '../../apis'
import { connect } from 'react-redux'
import ColorBox from '../ForestDetail/ColorBox'
import RegionForm from './RegionForm'
import {data} from '../Util/AttributeData'

const CreateRegionForm = ({  onOK, item, token }) => {
    const buttonStyle = {
        float: "right",
        marginLeft: "30px"
    }

    const createRegionFormData = () => {
        var x = []
        for (var j = 1; j < 4; j++) {
            var d={}
            for(var i =0; i<data['intAttr'].length; i++){
                d[data['intAttr'][i]] = 0
            }
            for(var i =0; i<data['floatAttr'].length; i++){
                d[data['floatAttr'][i]] = 0
            }
            for(var i =0; i<data['checkAttr'].length; i++){
                d[data['checkAttr'][i]] = false
            }
            for(var i =0; i<data['strAttr'].length; i++){
                d[data['strAttr'][i]] = ''
            }
            x.push(d)
        }
        return (x)
    }
    const [top, setTop] = useState(5.5)
    const [bot, setBot] = useState(5.5)
    const [left, setLeft] = useState(5.5)
    const [right, setRight] = useState(5.5)
    const [file, setFile] = useState(null)
    const [fileList, setFileList] = useState([])
    const [mouseDown, setMouseDown] = useState(false)
    const [gridData, setGridData] = useState([[]])
    const [color, setColor] = useState(0)
    const [size, setSize] = useState(0)
    const [height, setHeight] = useState(0)
    const [width, setWidth] = useState(0)
    const [loading, setLoading] = useState(false)
    const [mouseMove, setMouseMove] = useState(true)
    const [iMax, setIMax] = useState(0)
    const [jMax, setJMax] = useState(0)
    const [img, setImg] = useState("")
    const [resize, setResize] = useState(0)
    const [regionFormData, setRegionFormData] = useState(createRegionFormData())
    const [forestID, setForestID] = useState(null)
    const imgRef = useRef()
    const [regionExist, setRegionExist] = useState([0,0,0])


    const { REACT_APP_GOOGLE_KEY } = process.env


    // const spin = loading ?
    //         <div style={{ width: "100%", height: "100%", zIndex: '3', position: "absolute", backgroundColor: '#FFF', opacity: 0.5, alignItems: 'center', }}>
    //             <Spin style={{ left: "50%", top: "50%", position: "absolute" }} />
    //         </div>
    //         : <div></div>

    
    const submitCoordinateFromMap = (t, l, r, b) => {
        // console.log(t + "---" + l + "---" + r + "---" + b)
        // var zoomLevel = getZoomLevel(t, b, r, l)
        // var image_dimension = getImgDimension(t - b, r - l)
        // var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
        //     + (t + b) / 2 + "," + (r + l) / 2 + "&zoom=" + zoomLevel
        //     + "&size=" + image_dimension[1] + "x" + image_dimension[0] +
        //     "&maptype=satellite&key=" + `${REACT_APP_GOOGLE_KEY}`
        // // console.log(img_url)
        // setTop(t)
        // setLeft(l)
        // setBot(b)
        // setRight(r)
        // setImg(img_url)
    }

    const getImgDimension = (latDiff, lngDiff) => {
        const imgDimension = 640
        var img_height = Math.round(latDiff > lngDiff ? imgDimension : (latDiff / lngDiff) * imgDimension)
        var img_width = Math.round(lngDiff > latDiff ? imgDimension : (lngDiff / latDiff) * imgDimension)
        return [img_height, img_width]
    }

    // Color Box --------------------------------------------------------------------------------


    const handleResize = e => {
        setResize(resize + 1)
        calculateSize()
    }

    const onImgLoad = () => {
        // console.log("img load");
        var { iMax, jMax } = calculateSize()
        var f = new Array();
        for (var i = 0; i < iMax; i++) {
            f[i] = new Array();
            for (var j = 0; j < jMax; j++) {
                f[i][j] = 0;
            }
        }
        setGridData(f)
    }


    const calculateSize = () => {
        if (imgRef.current) {
            var rect = imgRef.current.getBoundingClientRect()
            var height = rect.height
            var width = rect.width
            var size = Math.ceil(Math.sqrt(height * width / 200))
            var iMax = Math.ceil(height / size)
            var jMax = Math.ceil(width / size)
            setSize(size)
            setWidth(width)
            setHeight(height)
            setIMax(iMax)
            setJMax(jMax)
            return { iMax, jMax }
        } else {
            var a = 0
            return { a, a }
        }
    }

    const onMouseMove = async (e) => {
        if (imgRef.current) {
            if (mouseDown && mouseMove) {
                var newData = gridData.map(function (arr) {
                    return arr.slice();
                });
                var rect = imgRef.current.getBoundingClientRect()
                var i = Math.floor((e.pageY - rect.top - window.pageYOffset) / size)
                var j = Math.floor((e.pageX - rect.left - window.pageXOffset) / size)
                // console.log(rect);
                if (i >= 0 && j >= 0 && i < iMax && j < jMax && newData[i][j] != color) {
                    newData[i][j] = color
                    // this.setState({mouseMove:false})
                    // console.log("set false");
                    // setTimeout(() => {
                    //     this.setState({mouseMove:true})
                    //     // console.log("settrue");
                    // }, 0.1);
                    setGridData(newData)
                }
            }
        }
    }

    const onMouseDown = (e) => {
        setMouseDown(true)
        // console.log("down");
    }
    const onMouseUp = (e) => {
        setMouseDown(false)
        // console.log(e);
    }


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

    const getNonEmptyRegion = (regionForm) => {
        var nonEmptyRegion = []
        for (var i in regionExist){
            if(regionExist[i]){
                nonEmptyRegion.push(regionForm[i])
            }
        }
        return nonEmptyRegion
    }

    const onFinalSubmit = async (v) => {
        // console.log("submit", v);
        setLoading(true)

        var forestID = item.id
        
        console.log(gridData)
        var nonEmptyRegion = getNonEmptyRegion(regionFormData)

        console.log(nonEmptyRegion)
        console.log(forestID)
        console.log(size)
        var res = await api.post('create-regions',
            {
                image_map: gridData,
                data: nonEmptyRegion,
                forest_id: forestID,
                block_size: size,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
        // console.log(res, "res");
        setForestID(res.data.id)
        onOK(forestID,4)
    }

    const changeRegionData = (groupNum, value) => {
        let item = regionFormData
        item[groupNum] = { ...item[groupNum], ...value }
        setRegionFormData(item)
        var temp = regionExist
        temp[groupNum] = 1
        setRegionExist(temp)
    }

    
    const spin = loading ?
        <div style={{ width: "100%", height: "100%", zIndex: '3', position: "absolute", backgroundColor: '#FFF', opacity: 0.5, alignItems: 'center', }}>
            <Spin style={{ left: "50%", top: "50%", position: "absolute" }} />
        </div>
        : <div></div>
    return (
        <div>
            <div
                style={{ position: "relative", "width": "100%" }}
                onMouseUp={onMouseUp}
            >
                {/* {spin} */}
                    <div style={{ position: "relative", marginBottom: "20px" }}
                        onDragStart={(e) => { e.preventDefault(); }}
                        onMouseMove={onMouseMove}
                        onMouseDown={onMouseDown}
                    >
                        <img 
                        style={{ "width": "50%", zIndex: "1" }}
                        draggable="false"
                        ref={imgRef}
                        onLoad={onImgLoad}
                        onDragStart={(e) => { e.preventDefault(); }}
                        src={item.maps_image}
                    />
                    {gridData.map((item, i) => {
                        return (item.map((item, j) => {
                            return (
                                <ColorBox
                                    colorCode={item}
                                    size={size}
                                    top={i * size}
                                    left={j * size}
                                    key={i * jMax + j}
                                    onDragStart={(e) => { e.preventDefault(); }} />
                            )
                        }))
                    })}
                </div>
                <Button onClick={() => { setColor(0) }}>erase</Button>
                <Button onClick={() => { setColor(1) }}>1</Button>
                <Button onClick={() => { setColor(2) }}>2</Button>
                <Button onClick={() => { setColor(3) }}>3</Button>
                <Row>
                    {
                        regionFormData.map((d, index) =>
                            <RegionForm initialData={d} onChange={changeRegionData} key={index} id={index} />
                        )
                    }</Row>
                <Button style={buttonStyle} onClick={onFinalSubmit}>Submit</Button>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(CreateRegionForm)
