import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Layout, Menu, Button } from 'antd';
import { withRouter } from 'react-router-dom'
// import img from '../../test.jpg'
import { api } from '../../apis'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/auth';
import { Redirect, Link } from "react-router-dom";
import ForestInfo from './ForestInfo';
import NewAddForm from '../ForestDetail/NewAddForm'
// import Filter from '../Setting/Filter';
import Filter2 from '../Setting/Filter2';
import { data } from '../Util/AttributeData';

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;
class AllForests extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menu: "my",
            allForest: [],
            data: [],
            cur_item: (props.location.state && props.location.state.cur_item) || {},
            type: props.user_type,
            showAddModal: false,
            cur_item_region: null,
            showNewAddModal: false,
        }
    }

    getMenuForest = (menu, allForest) => {
        if (menu == 'my') {
            return allForest.filter(forest => forest.state == 3)
        } else if (menu == 'pending-funding-goal') {
            return allForest.filter(forest => forest.state == 2)
        } else if (menu == 'pending-verification') {
            return allForest.filter(forest => forest.state == 1)
        } else {
            return allForest
        }
    }

    setMenu = () => {
        console.log(this.state.type)
        if (this.state.type == 'Funder' || this.state.type == 'Authen'){
            this.setState({
                menu: 'allforest'
            })
        }
    }
    async getForests(){
        const {token} = this.props
        console.log(token);
        var res = await api.get('forest/?abc=a&d=d',
            {
                headers: {
                    'Authorization': 'Authorization: Token ' + token
                }
            })
        return res
    }
    async componentDidMount() {
        var res = await this.getForests()
        this.setState({
            allForest: allResForest,
            data: this.getMenuForest(this.state.menu, allResForest)
        })
        if (res.data.length > 0) {
            if (this.isCurEmpty()) {
                this.setState({ cur_item: this.state.data[0] })
            }
            await this.getCurrentRegion(this.state.data[0].id)
        }
        // console.log(res);
    }

    async setCurrForest(data) {
        if (data.length > 0) {
            console.log(11111)
            this.setState({ cur_item: data[0] })
            await this.getCurrentRegion(data[0].id)
        }
    }

    //get region data of the selected forest
    getCurrentRegion = async (id) => {
        console.log(id);
        var res = await api.get('forest-single/' + id.toString())
        this.setState({ cur_item_region: res.data })
        // console.log(res);

    }
    isCurEmpty = () => {
        const { cur_item } = this.state
        for (var prop in cur_item) {
            if (cur_item.hasOwnProperty(prop))
                // console.log(cur_item)
                return false;
        }
        return true;
    }

    setMenuForest = (menu) => {
        this.setState({
            menu: menu,
            data: this.getMenuForest(menu, this.state.allForest)
        })
        this.setCurrForest(this.getMenuForest(menu, this.state.allForest))
    }

    handleMenuCLick = e => {
        if (e.key == "logout") {
            // console.log('this.props', this.props)
            this.props.history.push("/")
        } else if (e.key == "add") {
            this.setState({ showAddModal: true })
        } else if (e.key == "add2") {
            this.setState({ showNewAddModal: true })
        } else if (e.key == "Filter") {
            this.setState({ showPreferenceSetting: true })
        } else if (e.key == "all") {
            this.showForestTable()
        } else if (e.key == "pending-funding-goal" || e.key == "pending-verification" || e.key == "my" || e.key == "allforest") {
            console.log(e.key)
            this.setMenuForest(e.key)
        }
        else {
            this.setState({ menu: e.key })
        }
    }

    //selecting a forest
    handleSelectForest = async e => {
        // // console.log(e,this.state.data.find(element => element.key == e.key));
        this.setState({ cur_item: this.state.data.find(element => element.key == e.key) })
        // // console.log([this.state.cur_item.key]);
        await this.getCurrentRegion(e.key)
    }

    showForestTable = () => {
        const { history } = this.props
        history.push({
            pathname: "/ForestTable",
            state: {
                item: this.state.cur_item
            }
        })
    }

    showForestDetail = () => {
        const { history } = this.props
        history.push({
            pathname: "/overview/forest",
            state: {
                item: this.state.cur_item
            }
        })
    }
    addNewForest = () => {
        this.setState({ showAddModal: true })
    }

    onOK = async (forest_id) => {
        var res = await this.getForests()
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
        const { type } = this.props
        return (
            type == "Owner" ?
                <div>
                    <Button style={{ float: "right", margin: "50px 30px" }} onClick={this.addNewForest}>Add New</Button>
                    <Button style={{ float: "right", margin: "50px 30px" }} onClick={this.showForestDetail}>Details</Button>
                </div>
                : type == "Funder" ?
                    <div>

                        <Button style={{ float: "right", margin: "50px 30px" }} onClick={this.showForestDetail}>Details</Button>
                    </div>
                    :
                    <Button style={{ float: "right", margin: "50px 30px" }} onClick={this.showForestDetail}>Details</Button>
        )
    }
    render() {
        const { data, cur_item, showAddModal, cur_item_region,
            showNewAddModal } = this.state
        const { type, token } = this.props
        // console.log(this.props, 'allf');
        // const { type } = this.props.location.state
        if (!token) {
            // console.log("token", token);
            return <Redirect to="/" />
        }
        return (
            <Layout style={{ height: "100vh" }}>
                <Header className="header">
                    {/* <div className="logo" /> */}
                    <Menu theme="dark" mode="horizontal"
                        defaultSelectedKeys={type == 'Funder' ? "allforest" : type == 'Authen' ? "allforest" : 'my'}
                        style={{ marginLeft: -50 }} onClick={this.handleMenuCLick}>
                        {(type == 'Funder' || type == 'Authen' )&&
                            <Menu.Item key="allforest">All Forest</Menu.Item>
                        }
                        {type == 'Owner' &&
                            <Menu.Item key="my">My forests</Menu.Item>
                        }
                        {type == 'Owner' &&
                            <Menu.Item key="pending-funding-goal">Pending Funding Goal</Menu.Item>
                        }
                        {type == 'Owner' &&
                            <Menu.Item key="pending-verification">Pending Verification</Menu.Item>
                        }


                        <Menu.Item key="all">Table of Regions</Menu.Item>
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
                            <ForestInfo item={cur_item} region={cur_item_region} onOK={this.onOK} />
                            {/* <div>{cur_item.desc}</div> */}
                            {this.buttons()}</div>
                        ) : (<div>No Forest</div>)}


                        <NewAddForm
                            showAddModal={showNewAddModal}
                            onOK={this.onOK}
                            onCancel={() => { this.setState({ showNewAddModal: false }); }}
                        // token={token}
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
    // console.log(state);
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