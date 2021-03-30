import React, { useState, useEffect } from 'react'
import { Menu, Slider, Switch, Row, Col, Select, Layout, Button, Table } from 'antd';
import { useHistory } from "react-router";
import { api } from '../../apis'
import { levels, choiceMapping, tidyName, levelValue, tableData } from '../Util/AttributeData'
import Filter2 from '../Setting/Filter2';

const { Header, Footer, Sider, Content } = Layout;

const Index = () => {

    const [showFilter, setShowFilter] = useState(false)
    const [filter, setFilter] = useState([])
    const [preference, setPreference] = useState({
        biodiversity_benefit: levels,
        livelihood_benefit: levels,
        local_benefit: levels,
        carbon_credit_status: levels,
        minised_leakage: levels,
        carbon_sequestration: [0, 10000],
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

    const columns = [
        ...tableData['regionInfo'].map((item) =>
        ({
            title: tidyName(item),
            dataIndex: item,
            key: item,
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
            title: 'Minised Leakage',
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
    ]

    const setAllRegions = (regionData, forestData) => {
        var tempTotalRegions = []
        var fName = ''
        var scope = ''
        var org_name = ''
        for (var r in regionData) {
            var tempRegion = regionData[r]
            var fId = tempRegion.forest
            var scope = tempRegion.international ? 'International' : 'Domestic'
            for (var f in forestData) {
                var tempForest = forestData[f]
                if (fId == tempForest.id)
                    fName = tempForest.name
                    org_name = tempForest.organization_name
            }
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
            }
            console.log(region)
            tempTotalRegions = tempTotalRegions.concat(region)
        }
        setTotalRegions(tempTotalRegions)
    }

    const fetchForest = async () => {
        var res = await api.get('forest/')
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
        var res = await api.get('region/')
        var tempData = res.data.map((e) => {
            var o = Object.assign({}, e)
            o.key = o.id.toString()
            return o
        })
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
    filter.non_nature_based, filter.nature_based]);

    const history = useHistory();

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
                    <Menu.Item style={{ float: "right" }} key="back">Go Back</Menu.Item>
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

export default Index
