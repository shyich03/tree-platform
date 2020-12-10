import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Button, Modal, Image } from 'antd';
import {withRouter} from 'react-router-dom'
import img from '../../test.jpg'
import {api} from '../../apis'
import AddForm from '../ForestDetail/AddForm'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';

const { Header, Content, Sider } = Layout;
class AllForests extends Component{
    constructor(props){
        super(props)
        this.state = {
            menu: "my",
            data : [],
            cur_item: props.location.state.cur_item||{},
            type: props.location.state.type,
            showAddModal: false
            
        }
    }
    async componentDidMount(){
        var res = await api.get('forest/')
        console.log(res.data);
        this.setState({
            data: res.data.map((e)=>{
                var o = Object.assign({}, e)
                o.key = o.id.toString() 
                return o
            }),
        })
        if(this.isCurEmpty()){
            this.setState({cur_item: this.state.data[0]})
        }
        console.log(res, this.state.data, this.state.cur_item);
    }

    isCurEmpty=() =>{
        const {cur_item}=this.state
        for(var prop in cur_item) {
            if(cur_item.hasOwnProperty(prop))
                return false;
        }
        return true;
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
        // console.log(e,this.state.data.find(element => element.key == e.key));
        this.setState({cur_item: this.state.data.find(element => element.key == e.key)})
        // console.log([this.state.cur_item.key]);
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
        type=="Owner"?
            <div>
            <Button style={{float:"right", margin:"50px 30px"}} onClick={this.addNewForest}>Add New</Button>
            <Button style={{float:"right", margin:"50px 30px"}} onClick={this.showForestDetail}>Details</Button>
            </div>
        :type=="Funder"?
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
                    selectedKeys={cur_item?[cur_item.key]:[]}
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
                    {!this.isCurEmpty()?(<div>
                    <Image src={img} width={900} />
                    <div>{cur_item.desc}</div>
                    {this.buttons()}</div>
                    ):(<div>No Forest</div>)}
                    <Modal 
                        title="Add Forest"
                        visible={showAddModal}
                        width="80%"
                        onOk={this.addOK}
                        onCancel={()=>{this.setState({ showAddModal: false  });}} >
                        <AddForm />
                    </Modal>
                    </Content>
                    
                {/* </Layout> */}
                </Layout>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>
            
        )
    }
}

// const mapStateToProps = (state) => {
//   return {
//       loading: state.loading,
//       error: state.error
//   }
// }

const mapDispatchToProps = dispatch => {
  return {
      onLogout: (username, password, type) => dispatch(actions.logout(username, password, type)) 
  }
}
export default withRouter(connect(mapDispatchToProps)(AllForests))