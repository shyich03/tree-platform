import React, { Component } from "react";

export default class ColorBox extends Component{


    render(){
        const {colorCode, size, top, left}=this.props
        var color
        switch(colorCode){
            case 0:
                color="#ffffff"
                break;
            case 1:
                color="#00ff00"
                break;
            case 2:
                color="#ff0000"
                break;
            case 3:
                color="#0066ff"
                break;

        }
        return (
        <div style={{
            backgroundColor:color,
            visibility:colorCode==0?"hidden":"visible",
            width: size.toString()+"px",
            height: size.toString()+"px",
            position:"absolute",
            top:top,
            left:left,
            zIndex:"3"
        }} />
        )
    }

}