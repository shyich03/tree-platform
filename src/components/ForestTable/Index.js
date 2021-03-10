import React, { useState, useEffect } from 'react'
import { Modal, Slider, Switch, Row, Col, Select, Layout, Button, Table } from 'antd';
import { useHistory } from "react-router";
import { api } from '../../apis'
const { Header, Footer, Sider, Content } = Layout;

const Index = () => {
    const [regions, setRegions] = useState([])

    const columns = [
        {
            title: 'Region ID',
            dataIndex: 'regionId',
            key: 'regionId',
            defaultSortOrder: 'ascend',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.regionId - b.regionId,
        },
        {
            title: 'Forest ID',
            dataIndex: 'forestId',
            key: 'forestId',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.forestId - b.forestId,
        },
        {
            title: 'Forest Name',
            dataIndex: 'forestName',
            key: 'forestName',
        },
        {
            title: 'Attr1',
            dataIndex: 'attr1',
            key: 'attr1',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.attr1 - b.attr1,
        },
        {
            title: 'Attr2',
            dataIndex: 'attr2',
            key: 'attr2',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.attr2 - b.attr2,
        },
        {
            title: 'Attr3',
            dataIndex: 'attr3',
            key: 'attr3',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.attr3 - b.attr3,
        },
        {
            title: 'Attr4',
            dataIndex: 'attr4',
            key: 'attr4',
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.attr4 - b.attr4,
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
        },
        {
            title: 'Fundings',
            dataIndex: 'fundings',
            key: 'fundings',
        },
    ];

    const setAllRegions = (regionData, forestData) => {
        var totalRegions = []
        var fName = ''
        for (var r in regionData) {
            var tempRegion = regionData[r]
            var fId = tempRegion.forest
            for (var f in forestData) {
                var tempForest = forestData[f]
                if (fId == tempForest.id)
                    fName = tempForest.name
            }
            var region = {
                key: tempRegion.id,
                regionId: tempRegion.id,
                forestId: tempRegion.forest,
                forestName: fName,
                attr1: tempRegion.attr1,
                attr2: tempRegion.attr2,
                attr3: tempRegion.attr3,
                attr4: tempRegion.attr4,
                description: tempRegion.description,
                fundings: ''
            }
            totalRegions = totalRegions.concat(region)
        }
        setRegions(totalRegions)
    }

    const fetchForest = async () => {
        var res = await api.get('forest/')
        var tempData = res.data.map((e) => {
            var o = Object.assign({}, e)
            o.key = o.id.toString()
            return o
        })
        return tempData
    }

    const fetchRegion = async () => {
        var res = await api.get('region/')
        var tempData = res.data.map((e) => {
            var o = Object.assign({}, e)
            o.key = o.id.toString()
            return o
        })
        return tempData
    }

    useEffect(() => {
        const getData = async () => {
            const forestFromServer = await fetchForest()
            const regionFromServer = await fetchRegion()
            // console.log(forestFromServer)
            // console.log(regionFromServer)
            // for (var r in regionFromServer) {
            //     console.log(regionFromServer[r])
            // }
            setAllRegions(regionFromServer, forestFromServer)
        }
        getData()
    }, [])

    const history = useHistory();

    const goBack = () => {
        history.push({
            pathname: "/overview",
        })
    }

    return (
        <Layout>
            <Header style={{ color: "white" }}>
                Forest Table
        </Header>
            <Content>
                <div>
                    <Table dataSource={regions} columns={columns} />
                </div>
                <Button onClick={goBack} type="primary" style={{ float: "center", marginTop: "20px", marginBottom: "20px", marginLeft: "40%" }}>Back</Button>

            </Content>
        </Layout>
    )
}

export default Index
