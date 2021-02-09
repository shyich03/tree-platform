import React from 'react'
import { Button } from 'antd';

const TempImg = ({ lat, lng, onSubmit}) => {
    return (
        <div style={{ position: "relative", marginBottom: "20px" }}
            onDragStart={(e) => { e.preventDefault(); }} >
            <img
                style={{ "width": "100%", zIndex: "1" }}
                draggable="false"
                onDragStart={(e) => { e.preventDefault(); }}
                src={"https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lng + "&zoom=10&size=400x400&key=" + "AIzaSyB3gxBKxepMLgDMHxUJFjTn8YBp3UcqCL0"}
            />
            <Button onClick={() => { console.log("erase") }}>erase</Button>
            <Button onClick={() => { console.log("1") }}>1</Button>
            <Button onClick={() => { console.log("2") }}>2</Button>
            <Button onClick={() => { console.log("3") }}>3</Button>
            <Button onClick={onSubmit}>submit</Button>
        </div>
    )
}

export default TempImg
