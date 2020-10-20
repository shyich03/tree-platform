import React, { Component } from "react";
import {BrowserRouter as Router, Link, Switch, Route} from "react-router-dom";
import { FunderLogin, OwnerLogin, AuthLogin} from './components/login';
import AllForests from './components/AllForests';
import Home from './components/home';
import Add from './components/ForestDetail/AddForest';
import Forest from './components/ForestDetail';

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
        <Route path="/overview/forest" component={Forest} />
        <Route path="/overview/add" component={Add} />
        <Route path="/overview" component={AllForests} />
        <Route path="/" exact={true} component={Home} />
    </Switch>
)}
