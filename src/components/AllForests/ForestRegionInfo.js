import React from 'react'
import ColorBox from '../ForestDetail/ColorBox'

const ForestRegionInfo = ({ color, area, size }) => {

    const toInt = (s) => {
        s = s.slice(2, -2)
        s = s.split("], [")
        s.map((item, i) => {
            s[i] = item.split(", ").map(s => +s)
        })
        return s
    }

    return (
        <div>
            {area && toInt(area).map((item, i) => {
                return (item.map((item, j) => {
                    return (
                        item != 0 && <ColorBox
                            colorCode={color}
                            size={size}
                            top={i * size}
                            left={j * size}
                            key={i * 100 + j}
                            onDragStart={(e) => { e.preventDefault(); }} />

                    )
                }))
            })}
        </div>
    )
}

export default ForestRegionInfo
