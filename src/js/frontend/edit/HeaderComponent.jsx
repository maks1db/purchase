import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import dateToString from '../libs/dateToString';
import bind from '../directives/bind';
import constants from './constants';

const Text = (props) => (
    <TextField
        hintText={props.title}
        floatingLabelText={props.title}
        fullWidth={true}
        {...props}
    />  
);

const TableGroup = (props) => (
    <div className="table w-100">
        {props.children}
    </div>
);

const Left = (props) => (
    <div className="cell w-50 p-r-15px p-l-15px">
        {props.children}
    </div>
);
const Right = (props) => (
    <div className="cell w-50 p-l-15px p-r-15px">
        {props.children} 
    </div>
);
const Date = (props) => (
    <DatePicker 
        autoOk={true}
        formatDate={date => dateToString(date, 'date')} 
        floatingLabelText={props.title}
        hintText={props.title}
        container="inline"   
        mode='landscape'
        fullWidth={true}
        {...props}
    />
);

export default class Component extends React.Component {

    constructor(){
        super();
        this.state = {
            title: '',
            office: '',
            paid: false,
            finished: false,
            org: '',
            orgHref: '',
            href: '',
            albumHref: '',
            date: undefined,
            planDate: undefined,
            orgData: []
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({...nextProps.header});
    }

    render(){

        const Bind = bind(this, false);
        const event = () => this.props.childEvent(constants.headerChange, this.state);

        const eventChangeHref = () => {

            this.props.childEvent(constants.headerChange, this.state);
            if (this.state.org === ''){
                this.props.childEvent(constants.changeOrgHref, this.state.orgHref)
                .then(result => {
                    if (result.data.hasOwnProperty('first_name')){
                        this.setState({
                            org: `${result.data.first_name} ${result.data.last_name}`
                        }, () => this.props.childEvent(constants.headerChange, this.state));
                    }
                });      
            }
            
        };
        return (<Tabs>
        <Tab label="Закупка">
            <TableGroup>
                <Left>
                    <Text 
                    title="Закупка" 
                    {...Bind.byName('title', event)}
                    />  
                </Left>
                <Right>
                    
                    <TableGroup>
                        <Left>
                            <Text 
                            title="Офис"
                            {...Bind.byName('office', event)} 
                            />    
                        </Left>
                        <Right>
                            <Checkbox
                                label="Оплачена"
                                {...Bind.checked('paid', event)} 
                            /> 
                            <Checkbox
                                label="Завершена"
                                {...Bind.checked('finished', event)} 
                            /> 
                        </Right>
                    </TableGroup> 
                </Right>
            </TableGroup>
        </Tab>
        <Tab label="Организатор">
            <TableGroup>
                <Left>
                    <Text 
                    title="Организатор" 
                    {...Bind.byName('org', event)}
                    />  
                </Left>
                <Right>
                    <Text 
                    title="Ссылка на страницу" 
                    {...Bind.byName('orgHref', eventChangeHref)}
                    />
                </Right>
            </TableGroup>
        </Tab>
        <Tab label="Ссылки">
            <TableGroup>
                <Left>
                    <Text 
                    title="Ссылка на тему" 
                    {...Bind.byName('href', event)}
                    />   
                </Left>
                <Right>
                    <Text 
                    title="Ссылка на альбом" 
                    {...Bind.byName('albumHref', event)}
                    />
                </Right>
            </TableGroup>
        </Tab>
        <Tab label="Периоды">
            <TableGroup>
                <Left>
                    <Date 
                    title="Дата доставки (плановая)"
                    {...Bind.byName('planDate', event)}
                    />   
                </Left>
                <Right>
                    <Date 
                    title="Дата доставки"
                    {...Bind.byName('date', event)}
                    />
                </Right>
            </TableGroup>
        </Tab>
    </Tabs>);  
    }
}

