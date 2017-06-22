import React from 'react';
import TextField from 'material-ui/TextField';

const style = {
    height: '80px'
};

const Date = (props) => (
    <DatePicker 
        autoOk={true}
        formatDate={date => dateToString(date, 'date')} 
        floatingLabelText="Дата смены"
        hintText="Дата смены"
        container="inline"   
        mode='landscape'
        value = {this.state.date}
        onChange={(ev,date)=> {
            this.setState({date: date});
            this.onUpdate(date);
        }
    }
    />
);
export default (props) => (
    <div>     
        
    </div>
);

