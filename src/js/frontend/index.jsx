import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Router, Route, IndexRoute, browserHistory } from 'react-router';
import Layout from './layout';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReduxToastr from 'react-redux-toastr';
import Main from './main';
import Edit from './edit';
import Purchase from './purchase';
import store from './store';
import './scss/index.scss';
import 'react-redux-toastr/src/styles/index.scss';

class App extends React.Component{
    constructor(){
        super();
        injectTapEventPlugin(); 
    }

    render(){
        return (               
            <Provider store={store}>
                <div>
                    <MuiThemeProvider> 
                        <Router history={browserHistory}>   
                            <Route path="/" component={Layout}>
                                <IndexRoute component={Main}/> 
                                <Route path="/create" component={Edit} />
                                <Route path="/edit/:id" component={Edit} />
                                <Route path="/purchase/:id" component={Purchase} />
                            </Route>        
                        </Router>                        
                    </MuiThemeProvider>
                    <ReduxToastr
                        timeOut={4000}
                        newestOnTop={false}
                        preventDuplicates
                        position="top-right"
                        transitionIn="fadeIn"
                        transitionOut="fadeOut"
                        progressBar
                    />
                </div>
            </Provider>
        );
    }
}

ReactDOM.render(
    <App />, 
    document.getElementById('root'));