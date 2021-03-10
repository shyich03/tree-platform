import React, { Component } from "react";
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";
import { FunderLogin, OwnerLogin, AuthLogin, FunderRegister, OwnerRegister, AuthRegister} from './components/login';
import AllForests from './components/AllForests';
import ForestTable from './components/ForestTable/Index';
import Home from './components/home';
// import Add from './components/ForestDetail/AddForest';
import Forest from './components/ForestDetail';
import Funding from './components/Funding'
import ForestDetail from "./components/ForestDetail";


export default () => {return(
    <Switch>
        <Route path="/FunderLogin">
        <FunderLogin />
        </Route>
        <Route path="/OwnerLogin">
        <OwnerLogin />
        </Route>
        <Route path="/AuthLogin">
        <AuthLogin />
        </Route>
        <Route path="/ForestTable" component={ForestTable} />
        <Route path="/overview/forest" component={Forest} />
        {/* <Route path="/overview/add" component={Add} /> */}
        <Route path="/overview" component={AllForests} />
        <Route path="/funding/:id" component={Funding} />
        {/* <Route path="/UserSetting">
        <FunderLogin />
        </Route> */}
        <Route path="/FunderRegister" component={FunderRegister} />
        <Route path="/OwnerRegister" component={OwnerRegister} />
        <Route path="/AuthRegister" component={AuthRegister} />
        <Route path="/" exact={true} component={Home} />
    </Switch>
)}
