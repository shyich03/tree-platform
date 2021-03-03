import React, { useState, useEffect, useRef } from "react"
import SearchForm from "./SearchForm"
import SearchMap from "./SearchMap"
import { Modal, Button, Upload, Spin, Row } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { api } from '../../apis'
import RegionForm from './RegionForm'
import { connect } from 'react-redux'
import ColorBox from '../ForestDetail/ColorBox'

const NewAddForm = ({ showAddModal, onOK, onCancel, token }) => {

    const buttonStyle = {
        float: "right",
        marginLeft: "30px"
    }

    const createRegionFormData = () => {
        var x = []
        for (var i = 1; i < 4; i++) {
            x.push({ 'attr1': 0, 'attr2': 0, 'attr3': 0, 'attr4': 0, "description": "" })
        }
        return (x)
    }

    const [showMap, setShowMap] = useState(false)
    const [showImage, setShowImage] = useState(false)
    const [lat, setLat] = useState(5.5)
    const [lng, setLng] = useState(5.5)
    const [top, setTop] = useState(5.5)
    const [bot, setBot] = useState(5.5)
    const [left, setLeft] = useState(5.5)
    const [right, setRight] = useState(5.5)
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
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
    const { Dragger } = Upload
    const imgRef = useRef()
    const form = useRef()

    const { REACT_APP_GOOGLE_KEY } = process.env


    // const spin = loading ?
    //         <div style={{ width: "100%", height: "100%", zIndex: '3', position: "absolute", backgroundColor: '#FFF', opacity: 0.5, alignItems: 'center', }}>
    //             <Spin style={{ left: "50%", top: "50%", position: "absolute" }} />
    //         </div>
    //         : <div></div>

    const getZoomLevel = (t, b, r, l) => {
        // const latDiff = top - bot
        // const lngDiff = right - left
        var geoViewport = require('@mapbox/geo-viewport')
        var bounds = geoViewport.viewport([
            b,
            l,
            t,
            r
        ], [480, 480]);
        return bounds.zoom
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

    const onFinalSubmit = async (v) => {
        // console.log("submit", v);
        setLoading(true)

        // first ------------------------
        // console.log(name)
        // console.log(description)
        // console.log(token)
        // console.log(top)
        // console.log(left)
        // console.log(bot)
        // console.log(right)
        // console.log(img)
        // console.log(file)
        const fileData = new FormData()
        fileData.append("name",name)
        fileData.append("description",description)
        fileData.append("varified",false)
        fileData.append("user_token",token)
        fileData.append("lat1",top)
        fileData.append("long1",left)
        fileData.append("lat2",bot)
        fileData.append("long2",right)
        fileData.append("maps_image",img)
        fileData.append("metadata_file",file)
        var res = await api.post('forest/', fileData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
        // var res = await api.post('forest/',
        //     {
        //         name: name,
        //         description: description,
        //         varified: false,
        //         user_token: token,
        //         lat1: top,
        //         long1: left,
        //         lat2: bot,
        //         long2: right,
        //         maps_image: img,
        //         metadata_file: fileData,
        //     })
        var forestID = res.data.id
        // -------------------
        // console.log(gridData)
        // console.log(regionFormData)
        // console.log(forestID)
        // console.log(size)
        res = await api.post('create-regions',
            {
                image_map: gridData,
                data: regionFormData,
                forest_id: forestID,
                block_size: size,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Authorization: Token ' + token
                }
            })
        // console.log(res, "res");
        setLoading(false)
        setForestID(res.data.id)
        setShowImage(false)
        setShowMap(false)
        onCancel()
        onOK(forestID)
    }

    // const submitImageMask = async () => {
    //     // console.log("region form", regionFormData);
    //     // var meta_data = this.formRef.map((ref, index)=>{{str(index): }})
    //     var res = await api.post('create-regions',
    //         {
    //             image_map: gridData,
    //             data: regionFormData,
    //             forest_id: forestID,
    //             block_size: size
    //         },
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': 'Authorization: Token ' + token
    //             }
    //         })
    //     // console.log(res, regionFormData());
    //     setRegionFormData(regionFormData())
    //     onOK(forestID)
    // }

    const changeRegionData = (groupNum, value) => {
        let item = regionFormData
        item[groupNum] = { ...item[groupNum], ...value }
        setRegionFormData(item)
    }

    const dummyRequest = ({ file, onSuccess }) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const onFileChange = info => {
        // console.log(info)
        // console.log(info.file.originFileObj)
        var newFile = null;
        if(info){
        switch (info.file.status) {
            case "uploading":
                break;
            case "done":
                newFile = info.file.originFileObj;
                setFile(newFile)
                setFileList([newFile])
                break;
            default:
                // error or removed
                newFile = null;
        }}
    };


    //------------------------------------------------------------------------------------------

    const submitCoordinateFromMap = (t, l, r, b) => {
        // console.log(t + "---" + l + "---" + r + "---" + b)
        var zoomLevel = getZoomLevel(t, b, r, l)
        var image_dimension = getImgDimension(t - b, r - l)
        var img_url = "https://maps.googleapis.com/maps/api/staticmap?center="
            + (t + b) / 2 + "," + (r + l) / 2 + "&zoom=" + zoomLevel
            + "&size=" + image_dimension[1] + "x" + image_dimension[0] +
            "&maptype=satellite&key=" + `${REACT_APP_GOOGLE_KEY}`
        // console.log(img_url)
        setTop(t)
        setLeft(l)
        setBot(b)
        setRight(r)
        setImg(img_url)
        setShowMap(false)
        setShowImage(true)
    }

    const onSearchFinish = (v) => {
        setLat(v.lat)
        setLng(v.long)
        setName(v.name)
        setDescription(v.description)
        setShowMap(true)
        // console.log('Success:', v);
    }

    const onFinishFailed = (e) => {
        // console.log('Failed:', e);
    }

    const submitCoordinateFromInput = (o) => {
        // console.log(o)
        // setLat(lat)
        // setLng(lng)
        setShowMap(true)
    }

    const onReturn = () => {
        if (showMap) {
            setShowMap(false)
        } else if (showImage) {
            setShowImage(false)
            setShowMap(true)
        } else {
            onCancel()
        }
    }

    const spin = loading ?
        <div style={{ width: "100%", height: "100%", zIndex: '3', position: "absolute", backgroundColor: '#FFF', opacity: 0.5, alignItems: 'center', }}>
            <Spin style={{ left: "50%", top: "50%", position: "absolute" }} />
        </div>
        : <div></div>

    return (
        <Modal
            width="80%"
            visible={showAddModal}
            title="Add Forest"
            footer={null}
            onCancel={onCancel}
        >

            {showMap ?
                <SearchMap lat={lat} lng={lng} onReturn={onReturn} onSubmit={submitCoordinateFromMap} />
                :
                showImage ?
                    <div
                        style={{ position: "relative", "width": "100%" }}
                        onMouseUp={onMouseUp}
                    >
                        {spin}
                        <div style={{ position: "relative", marginBottom: "20px" }}
                            onDragStart={(e) => { e.preventDefault(); }}
                            onMouseMove={onMouseMove}
                            onMouseDown={onMouseDown}
                        >

                            <img
                                style={{ "width": "100%", zIndex: "1" }}
                                draggable="false"
                                ref={imgRef}
                                onLoad={onImgLoad}
                                onDragStart={(e) => { e.preventDefault(); }}
                                src={img}
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
                                regionFormData.map((data, index) =>
                                    <RegionForm data={data} onChange={changeRegionData} key={index} id={index} />
                                )
                            }</Row>

                        <Dragger
                            fileList={fileList}
                            customRequest={dummyRequest}
                            multiple={false}
                            accept={".zip"}
                            onChange={onFileChange}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single upload.
    </p>
                        </Dragger>

                        <Button key="back" onClick={onReturn}>
                            Back
          </Button>
                        <Button style={buttonStyle} onClick={onFinalSubmit}>Submit</Button>
                    </div>
                    :
                    <SearchForm onReturn={onReturn} onFinishFailed={onFinishFailed} onFinish={onSearchFinish} />
            }


        </Modal>
    )
}
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(NewAddForm)
