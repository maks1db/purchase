import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import Checkbox from 'material-ui/Checkbox';
import dateToString from 'libs/dateToString';
import bind from 'directives/bind';
import constants from './constants';
import AutoComplete from 'material-ui/AutoComplete';

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
const DateComponent = (props) => (
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
            comment: ''
        };
    }

    componentWillReceiveProps(nextProps){
        let h = nextProps.header;
        if (typeof(h.date) === 'number' ){
            h.date = new Date(h.date);
        }
        this.setState({...h});
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
                            <AutoComplete
                                floatingLabelText="Офис"
                                filter={AutoComplete.noFilter}
                                openOnFocus={true}
                                dataSource={this.props.fillData.office}
                                {...Bind.byName('office', event)}
                                searchText={this.state.office}
                                onUpdateInput={(office)=> this.setState({office}, event)}
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
                    <AutoComplete
                        floatingLabelText="Организатор"
                        openOnFocus={true}
                        filter={AutoComplete.fuzzyFilter}
                        dataSource={this.props.fillData.org}
                        {...Bind.byName('org', event)}
                        searchText={this.state.org}
                        onUpdateInput={(org)=> this.setState({org}, () => {
                            this.props.orgHref(org)
                            .then(x => {
                                if (x.data.href !== ''){
                                    this.setState({orgHref: x.data.href},
                                    () => this.props.childEvent(constants.headerChange, this.state));
                                } 
                            });
                        })}
                    />   
                </Left>
                <Right>
                    <Text 
                    title="Ссылка на страницу" 
                    {...Bind.byName('orgHref', eventChangeHref)}
                    />
                </Right>
            </TableGroup>
            <div className="p-r-15px p-l-15px">
            <Text 
                title="Комментарий"
                {...Bind.byName('comment', event)}
                multiLine={true}
                rowsMax={3}
            />
            </div>
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
                    <DateComponent 
                    title="Дата доставки (плановая)"
                    {...Bind.byName('planDate', event)}
                    />   
                </Left>
                <Right>
                    <DateComponent 
                    title="Дата доставки"
                    {...Bind.byName('date', event)}
                    />
                </Right>
            </TableGroup>
        </Tab>
    </Tabs>);  
    }
}

