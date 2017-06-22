import React from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../actions';
import If from '../directives/if';
import Save from '../activeButtonsComponents/Save.jsx';
import Input from './InputComponent.jsx';

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
            modify: true
        };
    }

    componentWillMount(){
        this.props.setTitle('Новая закупка');
    }

    render(){
        return (
        <div>
            <Input />
            <Save {...If(this.state.modify, {secondary:true}, {primary:true})} />    
        </div>
        );
    }
}
