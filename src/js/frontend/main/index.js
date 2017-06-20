import React from 'react';
import { connect } from 'react-redux';
import {setTitle} from '../actions';
import Component from './Component.jsx'

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
            pushes: []
        };
    }

    componentWillMount(){
        this.props.setTitle('Сводная таблица');
    }

    render(){
        return <Component 
        />;
    }
}
