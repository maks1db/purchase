import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import dateToString from '../libs/dateToString';
import bind from '../directives/bind';

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
            planDate: undefined
        };
    }

    render(){

        const Bind = bind(this);
        return (<Tabs>
        <Tab label="Закупка">
            <TableGroup>
                <Left>
                    <Text 
                    title="Закупка" 
                    {...Bind.byName('title')}
                    />  
                </Left>
                <Right>
                    
                    <TableGroup>
                        <Left>
                            <Text 
                            title="Офис"
                            {...Bind.byName('office')} 
                            />    
                        </Left>
                        <Right>
                            <Checkbox
                                label="Оплачена"
                                {...Bind.byName('paid')} 
                            /> 
                            <Checkbox
                                label="Завершена"
                                {...Bind.byName('finished')} 
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
                    {...Bind.byName('org')}
                    />  
                </Left>
                <Right>
                    <Text 
                    title="Ссылка на страницу" 
                    {...Bind.byName('orgHref')}
                    />
                </Right>
            </TableGroup>
        </Tab>
        <Tab label="Ссылки">
            <TableGroup>
                <Left>
                    <Text 
                    title="Ссылка на тему" 
                    {...Bind.byName('href')}
                    />   
                </Left>
                <Right>
                    <Text 
                    title="Ссылка на альбом" 
                    {...Bind.byName('albumHref')}
                    />
                </Right>
            </TableGroup>
        </Tab>
        <Tab label="Периоды">
            <TableGroup>
                <Left>
                    <Date 
                    title="Дата доставки (плановая)"
                    {...Bind.byName('planDate')}
                    />   
                </Left>
                <Right>
                    <Date 
                    title="Дата доставки"
                    {...Bind.byName('plan')}
                    />
                </Right>
            </TableGroup>
        </Tab>
    </Tabs>);  
    }
}

