import React from 'react';
import DatePicker from 'material-ui/DatePicker';
import dateToString from '../libs/dateToString';

export default class Component extends React.Component{
    constructor(){
        super();
        this.state = {
            date: new Date()
        };
    }

    render(){
        return (
        <div>
            <div style={{textAlign:'center'}}>
                <DatePicker 
                    autoOk={true}
                    formatDate={date => dateToString(date, 'date')} 
                    floatingLabelText="Период"
                    hintText="Период"
                    container="inline"   
                    mode='landscape'
                    value = {this.state.date}
                    onChange={(ev,date)=> {
                        this.setState({date: date});
                    }
                }
                />
            </div>  
        </div>
        );
    }
}
