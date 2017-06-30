import React from 'react';
import { connect } from 'react-redux';
import { setTitle, setRowState } from '../actions';
import Table from '../main/TableComponent.jsx';
import {browserHistory} from 'react-router';
import api from '../api';

function mapStateToProps(state){
    return {
        rowState: state.rowState
    };
}
function mapDispatchToProps(dispatch){
    return {
        setTitle: (title) => dispatch(setTitle(title)),
        setRowState: (state) => dispatch(setRowState(state)) 
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends React.Component{
    constructor(){
        
        document.title = "Архив закупок";
        super();

        this.state = {
            purchases: []
        };
    }

    componentWillMount(){
        this.props.setTitle('Архив закупок');

        api.get('purchase', {query: ['finished = 1'], sort: {'planDate': false}}).then(res =>{
            this.setState({purchases: res.data});
        });
    }

    componentWillReceiveProps(nextProps){
        if (nextProps.rowState.length > 0){
            browserHistory.push('/purchase/' + this.state.purchases[nextProps.rowState[0]].id);
        }
    }

    componentWillUnmount(){
        this.props.setRowState([]);
    }

    render(){
        return (
        <div>
            <Table 
                purchases={this.state.purchases}
                setRowState={this.props.setRowState} 
            />             
        </div>
        );
    }
}
