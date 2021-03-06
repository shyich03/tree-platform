import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Layout, Menu, Button, Modal, Image } from 'antd';
import { withRouter } from 'react-router-dom'
import img from '../../test.jpg'
import { api } from '../../apis'
import AddForm from '../ForestDetail/AddForm'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import { Redirect } from "react-router-dom";
import ForestInfo from './ForestInfo';
import NewAddForm from '../ForestDetail/NewAddForm'
import Filter from '../Setting/Filter';
import Filter2 from '../Setting/Filter2';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
class AllForests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: "my",
            data: [],
            cur_item: (props.location.state && props.location.state.cur_item) || {},
            type: props.user_type,
            showAddModal: false,
            cur_item_region: null,
            showNewAddModal: false,
            showPreferenceSetting: false,
            preferenceDisables: [1, 1, 1, 1, 1, 1, 1],
            preference: [0, 0, 0, 0, 0, 0, 0]
        }
    }
    async componentDidMount() {
        var res = await api.get('forest/')
        this.setState({
            data: res.data.map((e) => {
                var o = Object.assign({}, e)
                o.key = o.id.toString()
                return o
            }),
        })
        if (res.data.length > 0) {
            if (this.isCurEmpty()) {
                this.setState({ cur_item: this.state.data[0] })
            }
            await this.getCurrentRegion(this.state.data[0].id)
        }
        console.log(res);
    }

    //get region data of the selected forest
    getCurrentRegion = async (id) => {
        console.log("singel forest");
        var res = await api.get('forest-single/' + id.toString())
        this.setState({ cur_item_region: res.data })
        console.log(res);

    }
    isCurEmpty = () => {
        const { cur_item } = this.state
        for (var prop in cur_item) {
            if (cur_item.hasOwnProperty(prop))
                console.log(cur_item)
            return false;
        }
        return true;
    }

    handleMenuCLick = e => {
        if (e.key == "logout") {
            console.log('this.props', this.props)
            this.props.history.push("/")
        } else if (e.key == "add") {
            this.setState({ showAddModal: true })
        } else if (e.key == "add2") {
            this.setState({ showNewAddModal: true })
        } else if (e.key == "Filter") {
            this.setState({ showPreferenceSetting: true })
        }
        else {
            this.setState({ menu: e.key })
        }
    }

    //selecting a forest
    handleSelectForest = async e => {
        // console.log(e,this.state.data.find(element => element.key == e.key));
        this.setState({ cur_item: this.state.data.find(element => element.key == e.key) })
        // console.log([this.state.cur_item.key]);
        await this.getCurrentRegion(e.key)
    }
    showForestDetail = () => {
        const { history } = this.props
        history.push({
            pathname: "/overview/forest",
            state: {
                item: this.state.cur_item,
                type: this.state.type
            }
        })
    }
    addNewForest = () => {
        this.setState({ showAddModal: true })
    }
    onOK = async (forest_id) => {
        var res = await api.get('forest/')
        var data = res.data.map((e) => {
            var o = Object.assign({}, e)
            o.key = o.id.toString()
            return o
        })
        var cur = data.find(e => e.id === forest_id)
        this.setState({
            data: data,
            showAddModal: false,
            showNewAddModal: false,
            cur_item: cur
        })
        await this.getCurrentRegion(forest_id)
    }

    // Preference Settings helpers-------------------------------------------
    onSwitchChange = (index) => {
        var temp = this.state.preferenceDisables
        temp[index] = !temp[index]
        this.setState({ preferenceDisables: temp })
    }
    








    //--------------------------------------------------------------------------------

    buttons = () => {
        const { type } = this.state
        return (
            type == "Owner" ?
                <div>
                    <Button style={{ float: "right", margin: "50px 30px" }} onClick={this.addNewForest}>Add New</Button>
                    <Button style={{ float: "right", margin: "50px 30px" }} onClick={this.showForestDetail}>Details</Button>
                </div>
                : type == "Funder" ?
                    <div>
                        <Button style={{ float: "right", margin: "50px 30px" }} onClick={this.onClickFund}>Fund</Button>
                        <Button style={{ float: "right", margin: "50px 30px" }} onClick={this.showForestDetail}>Details</Button>
                    </div>
                    :
                    <Button style={{ float: "right", margin: "50px 30px" }} onClick={this.showForestDetail}>Details</Button>
        )
    }
    render() {
        const { data, cur_item, showAddModal, cur_item_region,
            showNewAddModal, showPreferenceSetting,
            preferenceDisables, preference } = this.state
        const { type, token } = this.props
        console.log(this.props, 'allf');
        // const { type } = this.props.location.state
        if (!token) {
            console.log("token", token);
            return <Redirect to="/" />
        }
        return (
            <Layout style={{ height: "100vh" }}>
                <Header className="header">
                    {/* <div className="logo" /> */}
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={type == 'Funder' ? "sponser" : type == 'Authen' ? "pending" : 'my'} style={{ marginLeft: -50 }} onClick={this.handleMenuCLick}>
                        {type == 'Funder' &&
                            <Menu.Item key="sponser">Sponsering</Menu.Item>
                        }
                        {type == 'Authen' &&
                            <Menu.Item key="pending">Pending confirmation</Menu.Item>
                        }
                        {type == 'Owner' &&
                            <Menu.Item key="my">My forests</Menu.Item>
                        }
                        <Menu.Item key="all">All forests</Menu.Item>
                        <Menu.Item key="Filter">Filter</Menu.Item>
                        <SubMenu key="Sort" title="Sort by">
                            <Menu.Item key="bb">Biodiversity benefit</Menu.Item>
                            <Menu.Item key="lib">Livelihood benefit</Menu.Item>
                            <Menu.Item key="lob">Local benefit</Menu.Item>
                            <Menu.Item key="ccs">Carbon credit status</Menu.Item>
                            <Menu.Item key="ml">Minised leakage</Menu.Item>
                        </SubMenu>
                        <Menu.Item style={{ float: "right" }} key="logout">Log out</Menu.Item>

                        {/* {type == 'Owner' &&
                            <Menu.Item style={{ float: "right" }} key="add">Add New</Menu.Item>
                        } */}
                        {type == 'Owner' &&
                            <Menu.Item style={{ float: "right" }} key="add2">Add New</Menu.Item>
                        }
                    </Menu>
                </Header>

                <Layout height={"auto"}>
                    <Sider width={220} className="site-layout-background">
                        <Menu
                            mode="inline"
                            selectedKeys={cur_item ? [cur_item.key] : []}
                            style={{ height: '100%', borderRight: 0 }}
                            onClick={this.handleSelectForest}
                        >
                            {data.map(item => <Menu.Item key={item.key}>{item.name}</Menu.Item>)}
                        </Menu>
                    </Sider>

                    <Content
                        className="site-layout-background"
                        style={{
                            padding: 24,
                            margin: 0,
                            minHeight: 280,
                        }}
                    >
                        {!this.isCurEmpty() && cur_item_region ? (<div>
                            <ForestInfo item={cur_item} region={cur_item_region} />
                            {/* <div>{cur_item.desc}</div> */}
                            {this.buttons()}</div>
                        ) : (<div>No Forest</div>)}

                        {/* <AddForm
                            showAddModal={showAddModal}
                            onOK={this.onOK}
                            onCancel={() => { this.setState({ showAddModal: false }); }}
                        // token={token}
                        /> */}
                        <NewAddForm
                            showAddModal={showNewAddModal}
                            onOK={this.onOK}
                            onCancel={() => { this.setState({ showNewAddModal: false }); }}
                        // token={token}
                        />
                        <Filter2
                            showPreferenceSetting={showPreferenceSetting}
                            onCancel={() => { this.setState({ showPreferenceSetting: false }); }}
                            onSwitchChange={this.onSwitchChange}
                            preferenceDisables={preferenceDisables}
                            preference={preference}
                        />
                    </Content>

                    {/* </Layout> */}
                </Layout>
                {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
            </Layout>

        )
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        type: state.user_type,
        token: state.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: (username, password, type) => dispatch(actions.logout(username, password, type))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AllForests))