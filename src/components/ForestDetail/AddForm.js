import React, {Component}from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Modal,Button, InputNumber} from 'antd';
import {api} from '../../apis'
import img from '../../test.jpg'
import ColorBox from '../ForestDetail/ColorBox'

export default class AddForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            mouseDown: false,
            gridData: [[]],
            color: 0,
            size:0,
            height:0,
            width:0,
            loading:false
        }
        this.form = React.createRef();
        this.imgRef = React.createRef()
        this.boxRef = React.createRef()
    }
    onImgLoad({target:img}){
        // console.log(img,img.naturalHeight);
        var rect = this.imgRef.current.getBoundingClientRect()
        var height = rect.height
        var width= rect.width
        var size = Math.ceil(Math.sqrt(height*width/100))
        var iMax = Math.ceil(height/size)
        var jMax = Math.ceil(width/size)
        var f = new Array();
    
        for (var i=0;i<iMax;i++) {
          f[i]=new Array();
          for (var j=0;j<jMax;j++) {
            f[i][j]=0;
          }
        }
        this.setState({
          size: size,
          gridData: f,
          width:width,
          height:height
        })
        console.log(rect,height, width, size, iMax, jMax);
    }
    onMouseMove(e) {
        const {mouseDown, gridData, size, color} = this.state
        var newData =gridData.map(function(arr) {
          return arr.slice();
        });
        if (mouseDown){
          var rect = this.imgRef.current.getBoundingClientRect()
          var i=Math.floor((e.pageY-rect.top-window.pageYOffset)/size)
          var j=Math.floor((e.pageX-rect.left-window.pageXOffset)/size)
          console.log(e.pageY,rect.top,window.pageYOffset, e.pageX,rect.left, i,j, size,gridData,color);
          newData[i][j]=color
    
        }
        this.setState({gridData:newData})
      }
      onMouseDown(e){
        this.setState({mouseDown:true})
        console.log("down");
      }
      onMouseUp(e){
        this.setState({mouseDown:false})
        console.log("up");
      }
    render(){
        const {size,width, loading}=this.state
        const {showAddModal, onCancel, onOK, token} = this.props
    
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
        };
        const submitFrom = (v)=>{
            console.log("submit", v);
            var res = api.post('forest/', 
                {
                    ...v,
                    varified: false,
                    user_token: token
                })
            console.log(res);
            onOK()
            this.form.current.resetFields()

        }
        const buttonStyle = {
            float:"right",
            marginLeft:"30px"
        }
        return(
            
            <Modal onMouseDown={this.onMouseDown.bind(this)} onMouseUp={this.onMouseUp.bind(this)}
                title="Add Forest"
                visible={showAddModal}
                width="80%"
                onCancel={onCancel} 
                footer={null}>
            {loading?
            <Form
                ref = {this.form}
                style={{width: '80%', margin:"150px auto"}}
                {...this.layout}
                name="basic"
                onFinish={submitFrom}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                name="name"
                label="Forest name"
                rules={[
                {
                    required: true,
                    message: 'Please input forest name',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="description"
                label="Forest description"
                rules={[
                {
                    required: true,
                    message: 'Please input forest description',
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="lat1"
                label="Top left latitude"
                rules={[
                {
                    required: true,
                    message: 'Please input top left latitude',
                },
                {
                    type:"number",
                    message:"must be number"
                }
                ]}
            >
                <InputNumber/>
            </Form.Item>
            <Form.Item
                name="long1"
                label="Top left longitude"
                rules={[
                {
                    required: true,
                    message: 'Please input top left longitude',
                },
                {
                    type:"number",
                    message:"must be number"
                }
                ]}
            >
                <InputNumber/>
            </Form.Item>
            <Form.Item
                name="lat2"
                label="Bottom right latitude"
                rules={[
                {
                    required: true,
                    message: 'Please input bottom right latitude',
                },
                {
                    type:"number",
                    message:"must be number"
                }
                ]}
            >
                <InputNumber/>
            </Form.Item>
            <Form.Item
                name="long2"
                label="Bottom right longitude"
                rules={[
                {
                    required: true,
                    message: 'Please input bottom right longitude',
                },
                {
                    type:"number",
                    message:"must be number"
                }
                ]}
            >
                <InputNumber/>
            </Form.Item>

            <Form.Item>
                <Button style={buttonStyle} type="primary" htmlType="submit" className="login-form-button">
                Submit
                </Button>
                <Button style={buttonStyle} type="primary" onClick={onCancel}>Cancel</Button>
            </Form.Item>
            </Form>
            :
            <div>
            <div style={{position:"relative", }}
                onMouseMove={this.onMouseMove.bind(this)} 
                ref={this.boxRef}
                onDragStart={(e) => {e.preventDefault();}}>
            <img 
                onLoad={this.onImgLoad.bind(this)} 
                onDragStart={(e) => {e.preventDefault();}} 
                src={img} 
                width={1200} 
                useMap="#workmap"
                ref={this.imgRef}/>
            {this.state.gridData.map((item, i) =>{return(item.map((item, j) =>{return(<ColorBox colorCode={item} size={size} top={i*size} left={j*size} />)}))})}
            </div>
            
            <Button onClick={()=>{this.setState({color:1})}}>1</Button>
            <Button onClick={()=>{this.setState({color:2})}}>2</Button>
            <Button onClick={()=>{this.setState({color:3})}}>3</Button></div>
        }
            </Modal>
        )
    }
}