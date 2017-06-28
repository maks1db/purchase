import React from 'react';
import Component from './Component.jsx';
import { connect } from 'react-redux';
import { toggleMenu } from '../actions'

function mapStateToProps(state){
    return {
        title: state.title,
        stateMenu: state.stateMenu,
        paperDepth: state.paperDepth,
        titleHref: state.titleHref
    };
}
function mapDispatchToProps(dispatch){
    return {
        toggle: (state) => dispatch(toggleMenu(state))
        
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends React.Component{
    constructor(){
        super();
    }

    render(){
        return <Component 
            title = {this.props.title}
            stateMenu = {this.props.stateMenu}
            onToggle = {this.props.toggle}
            paperDepth = {this.props.paperDepth}
            titleHref = {this.props.titleHref}
        >
        {this.props.children}
        </Component>;
    }
}
