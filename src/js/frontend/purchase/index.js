import React from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../actions';
import ButtonChange from '../activeButtonsComponents/Change.jsx';
import ButtonRemove from '../activeButtonsComponents/Remove.jsx'
import If from '../directives/if';
import {browserHistory} from 'react-router';
import api from '../api';

function mapStateToProps(state){
    return {
        
    };
}
function mapDispatchToProps(dispatch){
    return {
        setTitle: (title) => dispatch(setTitle(title))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends React.Component{
    constructor(){
        
        
        super();

        this.state = {
        };
    }

    componentWillMount(){
        
        api.getItem('purchase', this.props.params.id).then(res =>{
            document.title = res.data.title;
            this.props.setTitle(document.title);
        });
    }

    componentWillUnmount(){
    }

    render(){
        return (
        <div>
            <ButtonChange 
                bottom={80} 
                right={30} 
                onTouchTap={() => browserHistory.push('/edit/' + this.props.params.id)}
            />
            <ButtonRemove bottom={30} right={80} />      
        </div>
        );
    }
}
