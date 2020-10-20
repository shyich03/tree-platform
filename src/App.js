import React, { Component } from "react";
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";
import { FunderLogin, OwnerLogin, AuthLogin} from './components/login';
import AllForests from './components/AllForests';
import Home from './components/home';
import Routes from "./Routes";

export default class App extends Component {
  componentDidMount() {
    console.log("adasfasd")
  }
  render(){
    return (
      <Router>
        <Routes/>
      </Router>
    );
  }
}

