import React from 'react';
import { connect } from 'react-redux';
import { setTitle, setPaperDepth } from '../actions';
import If from '../directives/if';
import Save from '../activeButtonsComponents/Save.jsx';
import Main from './MainComponent.jsx';

function mapStateToProps(state){
    return {

    };
}
function mapDispatchToProps(dispatch){
    return {
        setTitle: (title) => dispatch(setTitle(title)),
        setPaperDepth: (value) => dispatch(setPaperDepth(value))
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
        this.props.setPaperDepth(0);
    }

    componentWillUnmount(){
        this.props.setPaperDepth(2);    
    }

    render(){
        return (
        <div>
            <Main />
            <Save {...If(this.state.modify, {secondary:true}, {primary:true})} />    
        </div>
        );
    }
}
