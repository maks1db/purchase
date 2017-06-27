import React from 'react';
import { connect } from 'react-redux';
import { setTitle, setRowState } from '../actions';
import Table from './TableComponent.jsx';
import ButtonAdd from '../activeButtonsComponents/Add.jsx';
import ButtonChange from '../activeButtonsComponents/Change.jsx';
import ButtonRemove from '../activeButtonsComponents/Remove.jsx'
import If from '../directives/if';
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
        
        document.title = "Активные закупки";
        super();

        this.state = {
            purchases: []
        };
    }

    componentWillMount(){
        this.props.setTitle('Активные закупки');

        api.get('purchase').then(res =>{
            this.setState({purchases: res.data});
        });
    }

    render(){
        return (
        <div>
            <Table 
                purchases={this.state.purchases}
                setRowState={this.props.setRowState} 
            />
            <ButtonAdd 
                bottom={30} 
                right={30}
                onTouchTap={() => browserHistory.push('/create')}
            />
            {If(this.props.rowState.length > 0,
                (<div>
                <ButtonChange 
                    bottom={100} 
                    right={30} 
                    onTouchTap={() => browserHistory.push('/edit/' + this.state.purchases[this.props.rowState[0]].id)}
                    /><ButtonRemove bottom={30} right={100} /></div>),
                ''
            )}                
        </div>
        );
    }
}
