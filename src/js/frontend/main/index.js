import React from 'react';
import { connect } from 'react-redux';
import { setTitle, setRowState } from '../actions';
import Table from './TableComponent.jsx';
import ButtonAdd from '../activeButtonsComponents/Add.jsx';
import ButtonChange from '../activeButtonsComponents/Change.jsx';
import ButtonRemove from '../activeButtonsComponents/Remove.jsx'
import If from '../directives/if';
import {browserHistory} from 'react-router';

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
        super();

        this.state = {
            purchases: [
                {
                    id: 1,
                    title: 'Закупка',
                    planDate: new Date(),
                    office: 'Катукова 48',
                    cost: 1200 
                }
            ]
        };
    }

    componentWillMount(){
        this.props.setTitle('Активные закупки');
    }

    render(){
        return (
        <div>
            <Table 
                purchases={this.state.purchases}
                setRowState={this.props.setRowState} 
            />
            {If(
                this.props.rowState.length > 0,
                (<div><ButtonChange bottom={80} right={70} /><ButtonRemove /></div>),
                (<ButtonAdd 
                    onClick={() => browserHistory.push('/create')}
                />)
            )}                
        </div>
        );
    }
}
