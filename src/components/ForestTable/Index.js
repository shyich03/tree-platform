import React, { useState, useEffect } from 'react'
import { Menu, Slider, Switch, Row, Col, Select, Layout, Button, Table } from 'antd';
import { useHistory } from "react-router";
import { api } from '../../apis'
import { levels, choiceMapping, tidyName, levelValue, tableData } from '../Util/AttributeData'
import Filter2 from '../Setting/Filter2';
import { Redirect, Link } from "react-router-dom";
import { connect } from 'react-redux'

const { Header, Footer, Sider, Content } = Layout;

const Index = ({token}) => {

    const [showFilter, setShowFilter] = useState(false)
    const [filter, setFilter] = useState([])
    const [preference, setPreference] = useState({
        biodiversity_benefit: levels,
        livelihood_benefit: levels,
        local_benefit: levels,
        carbon_credit_status: levels,
        minised_leakage: levels,
        carbon_sequestration: [0, 1000],
        funding_goal: [0, 10000],
        domestic: 1,
        international: 1,
        nature_based: 1,
        non_nature_based: 1,
    }
    )

    const [totalRegions, setTotalRegions] = useState([])
    const [regions, setRegions] = useState([])

    const onFilterSubmit = (f) => {
        // console.log(f)
        setFilter(f)
        setPreference(f)
        setShowFilter(false)
    }
    const redirect = (id)=>{
        // console.log(id);
        history.push({
            pathname: `/overview/${id}`,
        })
    }
    const columns = [
        ...tableData['regionInfo'].map((item) =>
        ({
            title: tidyName(item),
            dataIndex: item,
            key: item,
            render: (t,r)=> {
                // console.log(t,r)
                return <Button type="link" onClick={()=>{redirect(r.forest_id)}}>{t}</Button>          
            }
        })),
        {
            title: 'Biodiversity Benefit',
            dataIndex: 'biodiversity_benefit',
            key: 'biodiversity_benefit',
            defaultSortOrder: 'ascend',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => levelValue[a.biodiversity_benefit] - levelValue[b.biodiversity_benefit],
            // render(text, record) {
            //     return {
            //       props: {
            //         style: { background: text == 'Low' ? "red" : ""}
            //       },
            //       children: <div>{text}</div>
            //     };
            //   }
        },
        {
            title: 'Livelihood Benefit',
            dataIndex: 'livelihood_benefit',
            key: 'livelihood_benefit',
            defaultSortOrder: 'ascend',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => levelValue[a.livelihood_benefit] - levelValue[b.livelihood_benefit],
        },
        {
            title: 'Local Benefit',
            dataIndex: 'local_benefit',
            key: 'local_benefit',
            defaultSortOrder: 'ascend',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => levelValue[a.local_benefit] - levelValue[b.local_benefit],
        },
        {
            title: 'Carbon Credit Status',
            dataIndex: 'carbon_credit_status',
            key: 'carbon_credit_status',
            defaultSortOrder: 'ascend',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => levelValue[a.carbon_credit_status] - levelValue[b.carbon_credit_status],
        },
        {
            title: 'Minimized Leakage',
            dataIndex: 'minised_leakage',
            key: 'minised_leakage',
            defaultSortOrder: 'ascend',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => levelValue[a.minised_leakage] - levelValue[b.minised_leakage],
        },
        {
            title: 'Carbon Sequestration',
            dataIndex: 'carbon_sequestration',
            key: 'carbon_sequestration',
            defaultSortOrder: 'ascend',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.carbon_sequestration - b.carbon_sequestration,
        },
        {
            title: 'Scope',
            dataIndex: 'scope',
            key: 'scope',
        },
        {
            title: 'Nature Based',
            dataIndex: 'natureBased',
            key: 'natureBased',
        },
        ...tableData['strAttr'].map((item) =>
        ({
            title: tidyName(item),
            dataIndex: item,
            key: item,
        })),
        {
            title: 'Funding Goal',
            dataIndex: 'funding_goal',
            key: 'funding_goal',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.funding_goal - b.funding_goal,
        },
    ]

    const setAllRegions = (regionData, forestData) => {
        var tempTotalRegions = []
        var fName = ''
        var scope = ''
        var org_name = ''
        var f_id = 0
        for (var r in regionData) {
            var tempRegion = regionData[r]
            var fId = tempRegion.forest
            var scope = tempRegion.international ? 'International' : 'Domestic'
            var maxId = 0
            for (var f in forestData) {
                var tempForest = forestData[f]
                // console.log(tempForest);
                if (fId == tempForest.id) {
                    // console.log(fId + "###" + tempForest.id)
                    // console.log(tempForest)
                    fName = tempForest.name
                    org_name = tempForest.organization_name
                    f_id = tempForest.id
                }
            }
            maxId = Math.max(maxId, parseInt(tempRegion.id))
            var region = {
                key: tempRegion.id,
                partner_name: org_name,
                project_name: fName,
                region_id: tempRegion.id,
                biodiversity_benefit: choiceMapping[tempRegion.biodiversity_benefit],
                livelihood_benefit: choiceMapping[tempRegion.livelihood_benefit],
                local_benefit: choiceMapping[tempRegion.local_benefit],
                carbon_credit_status: choiceMapping[tempRegion.carbon_credit_status],
                minised_leakage: choiceMapping[tempRegion.minised_leakage],
                carbon_sequestration: tempRegion.carbon_sequestration,
                scope: scope,
                natureBased: tempRegion.nature_based ? 'Yes' : 'No',
                description: tempRegion.description,
                funding_goal: tempRegion.funding_goal,
                forest_id: f_id
            }
            tempTotalRegions = tempTotalRegions.concat(region)
        }
        console.log(forestData,region);
        for (var i in forestData){
            var f = forestData[i]
            var included = false
            for (var j in region){
                var j = region[j]
                if (r.forest_id == f.id){
                    included = true
                    console.log(r.forest_id ,f.id )
                    break
                }
            }
            if (!included){
                console.log(f);
                var region = {
                    key: maxId+1,
                    partner_name: f.organization_name,
                    project_name: f.name,
                    region_id: '',
                    biodiversity_benefit: '',
                    livelihood_benefit: '',
                    local_benefit: '',
                    carbon_credit_status: '',
                    minised_leakage: '',
                    carbon_sequestration: '',
                    scope: '',
                    natureBased: 'No',
                    description: '',
                    funding_goal: '',
                    forest_id: f.id
                }
                maxId += 1
                tempTotalRegions = tempTotalRegions.concat(region)
            }
        }
        setTotalRegions(tempTotalRegions)
    }

    const fetchForest = async () => {
        console.log(token);
        var res = await api.get('forest/',
        {
            headers: {
                'Authorization': token
            }
        })
        var tempData = res.data.map((e) => {
            var o = Object.assign({}, e)
            o.key = o.id.toString()
            return o
        })
        // tempData = tempData.filter(forest => forest.state == 3)
        // console.log(JSON.stringify(tempData))
        // for (var x in tempData) {
        //     console.log(tempData[x])
        // }
        return tempData
    }

    const fetchUser = async () => {
        var res = await api.get('owneruser/')
        // console.log(JSON.stringify(res))
        var tempData = res.data.map((e) => {
            var o = Object.assign({}, e)
            o.key = o.id.toString()
            return o
        })
        // console.log(JSON.stringify(tempData))
        // for (var x in tempData) {
        //     console.log(tempData[x])
        // }
        return tempData
    }

    const fetchRegion = async () => {
        var res = await api.get('region/',
        {
            headers: {
                'Authorization': token
            }
        })
        var tempData = res.data.map((e) => {
            var o = Object.assign({}, e)
            o.key = o.id.toString()
            return o
        })
        tempData = tempData.filter(region => region.funding_goal)
        // console.log(tempData[0])
        return tempData
    }

    useEffect(() => {
        const getData = async () => {
            const forestFromServer = await fetchForest()
            const regionFromServer = await fetchRegion()
            // const userFromServer = await fetchUser()
            // console.log(forestFromServer)
            // console.log(regionFromServer)
            // for (var r in regionFromServer) {
            //     console.log(regionFromServer[r])
            // }
            setAllRegions(regionFromServer, forestFromServer)
        }
        getData()
    }, [])

    useEffect(() => {
        setRegions(totalRegions)
    }, [totalRegions]);

    const applyFilter = (reg) => {
        if (reg) {
            if (!filter.biodiversity_benefit.includes(reg.biodiversity_benefit)) {
                return false
            }
            if (!filter.livelihood_benefit.includes(reg.livelihood_benefit)) {
                return false
            }
            if (!filter.carbon_credit_status.includes(reg.carbon_credit_status)) {
                return false
            }
            if (!filter.minised_leakage.includes(reg.minised_leakage)) {
                return false
            }
            if (!filter.local_benefit.includes(reg.local_benefit)) {
                return false
            }
            if (!((reg.carbon_sequestration >= filter.carbon_sequestration[0]) && (reg.carbon_sequestration <= filter.carbon_sequestration[1]))) {
                return false
            }
            if (!((reg.funding_goal >= filter.funding_goal[0]) && (reg.funding_goal <= filter.funding_goal[1]))) {
                return false
            }
            var scope = []
            if (filter.domestic) scope.push('Domestic')
            if (filter.international) scope.push('International')
            if (!scope.includes(reg.scope)) {
                return false
            }
            var natureBased = []
            if (filter.nature_based) natureBased.push('Yes')
            if (filter.non_nature_based) natureBased.push('No')
            if (!natureBased.includes(reg.natureBased)) {
                return false
            }
            return true
        }
    }

    useEffect(() => {
        // console.log(filter)
        var filteredRegion = []
        for (var reg in totalRegions) {
            if (applyFilter(totalRegions[reg])) filteredRegion.push(totalRegions[reg])
        }
        setRegions(filteredRegion)
    }, [filter.biodiversity_benefit, filter.livelihood_benefit,
    filter.local_benefit, filter.carbon_credit_status, filter.minised_leakage,
    filter.carbon_sequestration, filter.domestic, filter.international,
    filter.non_nature_based, filter.nature_based, filter.funding_goal]);

    const history = useHistory();

    // not used
    const goBack = () => {
        history.push({
            pathname: "/overview",
        })
    }

    const handleMenuCLick = e => {
        if (e.key == "filter") {
            setShowFilter(true)
        } else if (e.key == "back") {
            goBack()
        }
    }

    return (
        <Layout>
            <Header className="header">
                <Menu theme="dark" mode="horizontal" style={{ marginLeft: -50 }} onClick={handleMenuCLick}>
                    <Menu.Item key="forest_table">Table of Regions</Menu.Item>
                    <Menu.Item key="filter">Filter</Menu.Item>
                    {/* <Menu.Item style={{ float: "right" }} key="back">Go Back</Menu.Item> */}
                </Menu>
            </Header>
            <Content>
                <div>
                    <Table dataSource={regions} columns={columns} />
                </div>
                <Filter2
                    showPreferenceSetting={showFilter}
                    onCancel={() => setShowFilter(false)}
                    onSubmit={onFilterSubmit}
                    preference={preference}
                />
            </Content>
        </Layout>
    )
}
const mapStateToProps = (state) => {
    // console.log(state);
    return {
        token: state.token
    }
}
export default connect(mapStateToProps)(Index)
