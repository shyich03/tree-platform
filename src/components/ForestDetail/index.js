import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Modal, Form, Input, Button, Checkbox, Image } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import img from '../../test.jpg'
import Item from 'antd/lib/list/Item';
const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;

// get item detail from backend
class ForestDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {...this.props.location.state,
            showConfirmModal: false,
            showDenyModal: false,
            type: props.location.state.type,
            item: props.location.state.item
        }
    }
    
    onClickBack=() =>{
        const {history} = this.props
        history.push({
        pathname : "/overview",
        state: {
            cur_item: this.state.item,
            type: this.state.type
        }
        })
    }
    onClickConfirm=()=>{
        this.setState({showConfirmModal:true})
    }
    onClickDeny=()=>{
        this.setState({showDenyModal:true})
    }
    confirmOK=()=>{
        //store info
        this.setState({showConfirmModal:false})
    }
    denyOK=()=>{
        //store info
        this.setState({showDenyModal:false})
    }
    buttons = ()=>{
        const {type} = this.state
        return(
        type=="owner"?
            <div>
            <Button style={{float:"right", margin:"50px 30px"}} onClick={this.onClickBack}>Back</Button>
            </div>
        :type=="funder"?
            <div>
            <Button style={{float:"right", margin:"50px 30px"}} onClick={this.onClickFund}>Fund</Button>
            <Button style={{float:"right", margin:"50px 30px"}} onClick={this.onClickBack}>Back</Button>
            </div>
        ://auth
            <div>
            <Button style={{float:"right", margin:"50px 30px"}} onClick={this.onClickConfirm}>Confirm</Button>
            <Button style={{float:"right", margin:"50px 30px"}} onClick={this.onClickDeny}>Deny</Button>
            <Button style={{float:"right", margin:"50px 30px"}} onClick={this.onClickBack}>Back</Button>
            </div>
        )}
    render(){
        const {item, showConfirmModal, showDenyModal} = this.state
        return(
            <Layout style={{height:"100vh"}}>
                <Content 
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}>{item.name}
                <Image src={img} width={1200} />
                    <div>{item.desc}</div>
                    {this.buttons()}
                    <Modal 
                        title="Confirm Forest Registration"
                        visible={showConfirmModal}
                        width="80%"
                        onOk={this.confirmOK}
                        onCancel={()=>{this.setState({ showConfirmModal: false  });}} >
                        <Form>
                            proof
                            <Input />
                        </Form>
                    </Modal>
                    <Modal 
                        title="Deny Forest Registration"
                        visible={showDenyModal}
                        width="80%"
                        onOk={this.denyOK}
                        onCancel={()=>{this.setState({ showDenyModal: false  });}} >
                        <Form>
                            proof
                            <Input />
                        </Form>
                    </Modal>
                </Content>
            </Layout>
        )
    }
}
export default withRouter(ForestDetail)