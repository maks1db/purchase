import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
import ReduxToastr from 'react-redux-toastr';
import Routes from './routes';
import configureStore from './store';

if (process.env.BROWSER){
    require('../../scss/index.scss');
    require('react-redux-toastr/src/styles/index.scss');
}

const initialState = window.__INITIAL_STATE__ || {};
const store = configureStore(initialState);

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
                        <Routes />                           
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