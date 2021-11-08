import React, {useState} from "react";
import axios from 'axios';
import './App.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Login from './Login'
import Profile from './Profile'

function App() {
    return (
    <Router>
      <Switch>
        <Route exact path ="/login" component={Login} />
        <Route exact path ="/profile" component ={() => <Profile authorized = {true} /> } />
      </Switch>
    </Router>
    );

}

export default App;
