import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Divider } from 'antd';

const FundingChart = ({ region }) => {

    console.log(region)
    var data = []
    if(region[0]){
    data = [
        { name: 'Fund A', value: region[0].funding_goal},
        { name: 'Fund B', value: region[1].funding_goal},
        { name: 'Fund C', value: region[2].funding_goal},
    ];
}

    const COLORS = ['#0066ff', '#cc3300', '#00cc00'];

    return (
        <div>
            <Divider orientation="left">Funding Proportion</Divider>
            <PieChart width={400} height={300}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    label
                >
                {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
                </Pie>
            </PieChart>
        </div>
    )
}

export default FundingChart
