import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect } from "react-router-dom";
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { Layout, List, Button, Modal, InputNumber} from 'antd';
import { api } from '../../apis'
const { Header, Footer, Sider, Content } = Layout;

class Funding extends Component{
    constructor(props) {
        super(props);
        this.state = {
            region: null,
            certificates: [],
            showModel: false,
            v:0
        }
    }
    onSubmit = async ()=>{
        const {token} = this.props
        const {v} =  this.state
        console.log(token);
        const id = this.props.match.params.id
        var res = await api.patch('fund-region/' + id,
            {amount:v},
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
        console.log(res);
        res = await api.get('region/' + id)
        this.setState({certificates:res.data.funding, showModel:false, v:0})

    }
    onCancel =()=>{
        this.setState({showModel:false})
    }
    onReturn =()=>{

    }
    async onClickFund(){        
        this.setState({showModel:true})
    }
    async componentDidMount() {
        const id = this.props.match.params.id
        var res = await api.get('region/' + id)
        console.log(res);
        console.log("asdf",this.state,res.data.funding);
        this.setState({region: res.data, certificates:res.data.funding})
        console.log("asdf",this.state);
    }
    render(){
        const {region, certificates, showModel, v} = this.state 
        console.log(this.state, this.props);
        return(
            <Layout>
                <Header style={{color: "white"}}>
                    Here's a list of donation certificates currently available for this region of the forest 
                </Header>
                <Content>
                    {(region&&certificates.length>0)?
                    <List
                    itemLayout="horizontal"
                    style={{marginLeft:'30px'}}
                    dataSource={certificates}
                    renderItem={(item,index) => (
                    <List.Item>
                        <a  target="_blank" href={"https://testnet.algoexplorer.io/asset/"+item.certificate}>{`Funding ${index}: $${item.amount}`}
                        </a>
                    </List.Item>
                    )}/>:
                    <div>No certificate found
                    </div>}
                    <Button style={{ float: "right", margin: "50px 30px" }} key="back" onClick={this.onReturn}>
                            Back
                    </Button>
                    <Button style={{ float: "right", margin: "50px 30px" }} onClick={()=>this.onClickFund(region.id)}>Fund</Button>
                    <Modal 
                        visible={showModel}
                        onCancel={this.onCancel}
                        onOk={this.onSubmit}>
                        <InputNumber min={0} value={v} onChange={v=>this.setState({v:v})}/>

                    </Modal>
                </Content>
            </Layout>
        )
    }

}

const mapStateToProps = (state) => {
    console.log(state);
  return {
      type:state.user_type,
      token: state.token
  }
}
export default withRouter(connect(mapStateToProps)( Funding))