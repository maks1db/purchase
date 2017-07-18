import React from 'react';
import {Router, Route, IndexRoute,IndexLink, browserHistory } from 'react-router';
import Main from '../main';
import Edit from '../edit';
import Purchase from '../purchase';
import History from '../history';
import Layout from '../layout';

export default () => (
    <Router history={browserHistory}>   
        <Route component={Layout}>
            <Route path="/" component={Main}/> 
            <Route path="/create" component={Edit} />
            <Route path="/edit/:id" component={Edit} />
            <Route path="/purchase/:id" component={Purchase} />
            <Route path="/history" component={History} />
        </Route>        
    </Router>
);