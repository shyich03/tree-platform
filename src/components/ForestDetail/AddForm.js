import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Modal, Button, InputNumber, Spin, Row } from 'antd';
import { api } from '../../apis'
import ColorBox from '../ForestDetail/ColorBox'
import timg from '../../test.jpg'
import NewForestForm from './NewForestForm'
import RegionForm from './RegionForm'
import { connect } from 'react-redux';

class AddForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mouseDown: false,
            gridData: [[]],
            color: 0,
            size: 0,
            height: 0,
            width: 0,
            loading: false,
            mouseMove: true,
            iMax: 0,
            jMax: 0,
            showMarker: false,
            img: null,
            resize: 0,
            regionFormData: this.regionFormData(),
            forestID: null
        }
        this.form = React.createRef();
        // this.regionForm = [React.createRef(),React.createRef(),React.createRef()];
        this.imgRef = React.createRef()
        this.boxRef = React.createRef()
    }
    regionFormData = () => {
        var x = []
        for (var i = 1; i < 4; i++) {
            x.push({ 'attr1': 0, 'attr2': 0, 'attr3': 0, 'attr4': 0, "description": "" })
        }
        return (x)
    }
    handleResize = e => {
        this.setState({ resize: this.state.resize + 1 })
        this.calculateSize()
    }

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.handleResize);
    }

    calculateSize() {
        if (this.imgRef.current) {
            var rect = this.imgRef.current.getBoundingClientRect()
            var height = rect.height
            var width = rect.width
            var size = Math.ceil(Math.sqrt(height * width / 800))
            var iMax = Math.ceil(height / size)
            var jMax = Math.ceil(width / size)
            this.setState({
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

    onImgLoad() {
        // console.log("img load");
        var { iMax, jMax } = this.calculateSize()

        var f = new Array();

        for (var i = 0; i < iMax; i++) {
            f[i] = new Array();
            for (var j = 0; j < jMax; j++) {
                f[i][j] = 0;
            }
        }
        this.setState({
            gridData: f,
        })
    }
    async onMouseMove(e) {

        const { mouseDown, mouseMove, gridData, size, color, iMax, jMax } = this.state
        if (mouseDown && mouseMove) {
            var newData = gridData.map(function (arr) {
                return arr.slice();
            });
            var rect = this.imgRef.current.getBoundingClientRect()
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
                this.setState({ gridData: newData })
            }
        }

    }

    onMouseDown(e) {
        this.setState({ mouseDown: true })
        // console.log("down");
    }
    onMouseUp(e) {
        this.setState({ mouseDown: false })
        // console.log("$$$$$$$$$$$$$$$$$$$$$")
        // console.log(e);
    }

    render() {
        // console.log("render");
        const { size, loading, jMax, img, showMarker, gridData, regionFormData } = this.state
        const { showAddModal, onCancel, onOK, token } = this.props
        // console.log(regionFormData, "regionFormData");
        const onFinishFailed = (errorInfo) => {
            // console.log('Failed:', errorInfo);
        };

        //$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$
        const submitForm = async (v) => {
            // console.log("submit", v);
            this.setState({ loading: true })
            var res = await api.post('forest/',
                {
                    ...v,
                    varified: false,
                    user_token: token
                })
            // console.log(res, "res");
            this.form.current.resetFields()
            this.setState({
                showMarker: true,
                loading: false,
                img: res.data.gee_image,
                forestID: res.data.id
            })
        }
        const submitImageMask = async () => {
            const { gridData, regionFormData, forestID, size } = this.state
            // console.log("region form", regionFormData);
            // var meta_data = this.formRef.map((ref, index)=>{{str(index): }})
            var res = await api.post('create-regions',
                {
                    image_map: gridData,
                    data: regionFormData,
                    forest_id: forestID,
                    block_size: size
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Authorization: Token ' + token
                    }
                })
            // console.log(res, this.regionFormData());
            this.setState({
                showMarker: false,
                regionFormData: this.regionFormData()
            })
            onOK(forestID)

        }
        const changeRegionData = (groupNum, value) => {
            let item = this.state.regionFormData
            item[groupNum] = { ...item[groupNum], ...value }
            this.setState({ regionFormData: item })
        }
        const spin = loading ?
            <div style={{ width: "100%", height: "100%", zIndex: '3', position: "absolute", backgroundColor: '#FFF', opacity: 0.5, alignItems: 'center', }}>
                <Spin style={{ left: "50%", top: "50%", position: "absolute" }} />
            </div>
            : <div></div>
        return (

            <Modal
                title="Add Forest"
                visible={showAddModal}
                width="80%"
                onCancel={onCancel}
                footer={null}>
                {!showMarker ?
                    <div style={{ position: "relative" }}>
                        {spin}
                        <NewForestForm
                            formRef={this.form}
                            submitForm={submitForm}
                            onFinishFailed={onFinishFailed}
                            onCancel={onCancel} />
                    </div>
                    :
                    <div
                        onDragStart={(e) => { e.preventDefault(); }}
                        onMouseUp={this.onMouseUp.bind(this)}
                        style={{ position: "relative", "width": "100%", padding: "5%" }}>
                        <div style={{ position: "relative", marginBottom: "20px" }}
                            onMouseMove={this.onMouseMove.bind(this)}
                            ref={this.boxRef}
                            onMouseDown={this.onMouseDown.bind(this)}
                            onDragStart={(e) => { e.preventDefault(); }}
                        >
                            <img
                                draggable="false"
                                onLoad={this.onImgLoad.bind(this)}
                                onDragStart={(e) => { e.preventDefault(); }}
                                src={img}
                                ref={this.imgRef}
                                style={{ "width": "100%", zIndex: "1" }} />
                            <div style={{
                                backgroundImage: timg,
                                width: "100%",
                                height: "100%",
                                zIndex: "2"
                            }} />
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
                        <Button onClick={() => { this.setState({ color: 0 }) }}>erase</Button>
                        <Button onClick={() => { this.setState({ color: 1 }) }}>1</Button>
                        <Button onClick={() => { this.setState({ color: 2 }) }}>2</Button>
                        <Button onClick={() => { this.setState({ color: 3 }) }}>3</Button>
                        <Row>
                            {
                                regionFormData.map((data, index) =>
                                    <RegionForm data={data} onChange={changeRegionData} key={index} id={index} />
                                )
                            }</Row>
                        <Button onClick={submitImageMask}>submit</Button>

                    </div>
                }
            </Modal>
        )
    }
} const mapStateToProps = (state) => {
    // console.log(state);
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(AddForm)