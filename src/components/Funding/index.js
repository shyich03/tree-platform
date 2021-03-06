import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Redirect } from "react-router-dom";
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import { Layout, List, Button} from 'antd';
import { api } from '../../apis'
const { Header, Footer, Sider, Content } = Layout;

class Funding extends Component{
    constructor(props) {
        super(props);
        this.state = {
            region: null,
            certificates: []
        }
    }

    async onClickFund(){
        const {region} = this.state
        const id = this.props.match.params.id
        var res = await api.patch('fund-region/' + id)
        console.log(res);
        this.setState({certificates:res.data.certificates})
    }
    async componentDidMount() {
        const id = this.props.match.params.id
        var res = await api.get('region/' + id)
        console.log(res);
        this.setState({region: res.data, certificates:JSON.parse(res.data.certificates)})
        console.log();
    }
    render(){
        const {region, certificates} = this.state 
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
                    dataSource={certificates}
                    renderItem={item => (
                    <List.Item>
                        <Button type="link" onClick={()=>{window.open("https://testnet.algoexplorer.io/asset/"+item)}}>{item}
                        </Button>
                    </List.Item>
                    )}/>:
                    <div>No certificate found
                    </div>}
                    <Button style={{ float: "right", margin: "50px 30px" }} onClick={()=>this.onClickFund(region.id)}>Fund</Button>

                </Content>
            </Layout>
        )
    }

}

const mapStateToProps = (state) => {
    // console.log(state);
  return {
      type:state.user_type,
      token: state.token
  }
}
export default withRouter(connect(mapStateToProps)( Funding))