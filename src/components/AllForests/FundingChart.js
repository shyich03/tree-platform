import React from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Divider } from 'antd';

const FundingChart = ({ region }) => {

    console.log(region)
    var data = []
    
    if(region[0]){
        for (var i in region){
            data.push({ name: 'Fund '+ i, value: region[i].funding_goal})
        }
}

    const COLORS = ['#00cc00', '#cc3300', '#0066ff'];

    return (
        <div>
            <Divider orientation="left">Funding Goal Proportion</Divider>
            <PieChart width={500} height={400}>
                <Pie
                    dataKey="value"
                    isAnimationActive={false}
                    data={data}
                    cx="50%"
                    cy="50%"
                    outerRadius={160}
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
