import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import dateToString from '../libs/dateToString';

const Text = (props) => (
    <TextField
        hintText={props.title}
        floatingLabelText={props.title}
        fullWidth={true}
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

export default (props) => 
(<Tabs>
    <Tab label="Закупка">
        <TableGroup>
            <Left>
                <Text title="Закупка" />  
            </Left>
            <Right>
                
                <TableGroup>
                    <Left>
                        <Text title="Офис" />    
                    </Left>
                    <Right>
                        <Checkbox
                            label="Оплачена"
                        /> 
                        <Checkbox
                            label="Завершена"
                        /> 
                    </Right>
                </TableGroup> 
            </Right>
        </TableGroup>
    </Tab>
    <Tab label="Организатор">
        <TableGroup>
            <Left>
                <Text title="Организатор" />  
            </Left>
            <Right>
                <Text title="Ссылка на страницу" />
            </Right>
        </TableGroup>
    </Tab>
    <Tab label="Ссылки">
        <TableGroup>
            <Left>
                <Text title="Ссылка на тему" />   
            </Left>
            <Right>
                <Text title="Ссылка на альбом" />
            </Right>
        </TableGroup>
    </Tab>
    <Tab label="Периоды">
        <TableGroup>
            <Left>
                <Date title="Дата доставки (плановая)"/>   
            </Left>
            <Right>
                <Date title="Дата доставки"/>
            </Right>
        </TableGroup>
    </Tab>
</Tabs>);
