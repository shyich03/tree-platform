import React, { Component } from "react";
import Routes from "../../Routes";
import {BrowserRouter as Router, Link} from "react-router-dom";  
import {Layout, Button, List} from "antd"
export default class Home extends Component{
    componentDidMount(){
        console.log("home mount")
    }
    componentWillUnmount(){
        console.log("home unmount")
    }
    componentWillMount(){
        console.log("home will mount")
    }
    // loginBlock=(linkStr, descStr)=>{
    //     return (
    //         <Button href={linkStr}>descStr</Button>
    //     )
    // }
    render(){
        const data = [
            {
                title: 'Funder',
                link: '/FunderLogin'
            },
            {
                title: 'Owner',
                link: '/OwnerLogin'
            },
            {
                title: 'Authentication agent',
                link: '/AuthLogin'
            }
          ];
        return(

        <Layout style={{height:"100vh"}}>
        <nav style={{width:600, margin:"200px auto "}}>
          <h1 style={{width:600, margin:"50px auto", textAlign:"center", fontSize:"50px"}}>log in as</h1>
          <List   grid={{ gutter: 0, column: 3 }}
            dataSource={data}
            renderItem={item => (
      <List.Item >
        <Button style={{width:170}} href={item.link}>{item.title}</Button>
      </List.Item>)}>
           
          </List>
        </nav>

      </Layout>
    )
}
}