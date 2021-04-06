import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Button, Modal, Spin, InputNumber } from 'antd';
import { api } from '../../apis'
export default class FundingCap extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            showModel: false,
            v: 0
        }
    }
    onClickButton = () => {
        this.setState({ showModel: true })
    }

    onSubmit = async () => {
        const { forest, region } = this.props
        console.log(this.state.v);
        var res = await api.patch(`region/${region.id}/`, {
            funding_goal: this.state.v
        })
        console.log(res.data);
        this.setState({ showModel: false })
        this.props.onOK(forest.id, 2)

    }
    onCancel = () => {
        this.setState({ showModel: false })
    }
    render() {
        const { showModel } = this.state
        return (
            <div>
                <Button onClick={this.onClickButton}>Set Funding Goal</Button>
                <Modal
                    title={'Funding Goal'}
                    visible={showModel}
                    onCancel={this.onCancel}
                    onOk={this.onSubmit}>
                    <InputNumber min={0} onChange={v => this.setState({ v: v })} />

                </Modal>
            </div>
        )
    }
}