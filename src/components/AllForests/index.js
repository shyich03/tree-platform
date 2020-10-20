import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Breadcrumb, Form, Input, Button, Modal, Image } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import {withRouter} from 'react-router-dom'
import img from '../../test.jpg'
import Item from 'antd/lib/list/Item';

const { SubMenu } = Menu;
const { Header, Content, Sider, Footer } = Layout;
class AllForests extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            menu: "my",
            data : [
                {
                    name: "forest 1",
                    key: "1",
                    img: img,
                    desc: "this is a forest blablablabla1"
    
                },
                {
                    name: "forest 2",
                    key: "2",
                    img: img,
                    desc: "this is a forest blablablabla2"
    
                },
                {
                    name: "forest 3",
                    key: "3",
                    img: img,
                    desc: "this is a forest blablablabla3"
    
                },
                {
                    name: "forest 4",
                    key: "4",
                    img: img,
                    desc: "this is a forest blablablabla4"
    
                },
            ],
            cur_item: props.location.state.cur_item||{
                name: "forest 1",
                key: "1",
                img: img,
                desc: "this is a forest blablablabla"

            },
            type: props.location.state.type,
            showAddModal: false
            
        }
        console.log(props.location.state);
    }
    handleMenuCLick = e=>{
        if (e.key=="logout"){
            console.log('this.props', this.props)
            this.props.history.push("/")
        }else{
            this.setState({menu: e.key})
        }
    }
    handleSelectForest = e=>{
        this.setState({cur_item: this.state.data.find(element => element.key == e.key)})
    }
    showForestDetail = ()=>{
        const {history} = this.props
        history.push({ 
        pathname : "/overview/forest",
        state: {
            item: this.state.cur_item,
            type: this.state.type
        }
        })
    }
    addNewForest=() =>{
        this.setState({showAddModal:true})
    }
    addOK=()=>{
        //save data
        this.setState({showAddModal:false})
    }
    buttons = ()=>{
        const {type} = this.state
        return(
        type=="owner"?
            <div>
            <Button style={{float:"right", margin:"50px 30px"}} onClick={this.addNewForest}>Add New</Button>
            <Button style={{float:"right", margin:"50px 30px"}} onClick={this.showForestDetail}>Details</Button>
            </div>
        :type=="funder"?
            <div>
            <Button style={{float:"right", margin:"50px 30px"}} onClick={this.onClickFund}>Fund</Button>
            <Button style={{float:"right", margin:"50px 30px"}} onClick={this.showForestDetail}>Details</Button>
            </div>
        :
            <Button style={{float:"right", margin:"50px 30px"}} onClick={this.showForestDetail}>Details</Button>
        )}
    render(){
        const {data, cur_item, showAddModal} = this.state
        const {type} = this.props
        // const { type } = this.props.location.state
        return(
            <Layout style={{height:"100vh"}}>
                <Header className="header">
                {/* <div className="logo" /> */}
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['my']} style={{marginLeft:-50}} onClick={this.handleMenuCLick}>
                    <Menu.Item key="my">My forests</Menu.Item>
                    <Menu.Item key="all">All forests</Menu.Item>
                    <Menu.Item style={{float:"right"}} key="logout">Log out</Menu.Item>
                </Menu>
                </Header>
                
                <Layout height={"auto"}>
                <Sider width={220} className="site-layout-background">
                    <Menu
                    mode="inline"
                    selectedKeys={[cur_item.key]}
                    style={{ height: '100%', borderRight: 0 }}
                    onClick={this.handleSelectForest}
                    >
                        {data.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>)}
                    </Menu>
                </Sider>
                {/* <Layout style={{ padding: '0 24px 24px' }}> */}
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                    <Breadcrumb.Item>List</Breadcrumb.Item>
                    <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                    >
                    <Image src={img} width={900} />
                    <div>{cur_item.desc}</div>
                    {this.buttons()}
                    <Modal 
                        title="Add Forest"
                        visible={showAddModal}
                        width="80%"
                        onOk={this.addOK}
                        onCancel={()=>{this.setState({ showAddModal: false  });}} >
                        <Form>
                            proof
                            <Input />
                        </Form>
                    </Modal>
                    </Content>
                    
                {/* </Layout> */}
                </Layout>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
            
        )
    }
}
export default withRouter(AllForests)