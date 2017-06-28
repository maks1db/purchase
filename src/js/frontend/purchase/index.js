import React from 'react';
import { connect } from 'react-redux';
import { setTitle, titleHref } from '../actions';
import ButtonChange from '../activeButtonsComponents/Change.jsx';
import ButtonRemove from '../activeButtonsComponents/Remove.jsx'
import If from '../directives/if';
import {browserHistory} from 'react-router';
import api from '../api';
import state from '../commonState/purchase';

function mapStateToProps(state){
    return {
        
    };
}
function mapDispatchToProps(dispatch){
    return {
        setTitle: (title) => dispatch(setTitle(title)),
        titleHref: (href) => dispatch(titleHref(href))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends React.Component{
    constructor(){       
        super();

        this.state = state;
        this.state.purchase = [];
    }

    componentWillMount(){
        
        api.getItem('purchase', this.props.params.id).then(res =>{
            document.title = res.data.title;
            this.props.titleHref(res.data.href);
            this.props.setTitle(document.title);
        });
    }

    componentWillUnmount(){
        this.props.titleHref('');
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
