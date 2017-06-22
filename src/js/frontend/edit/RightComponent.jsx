import React from 'react';
import TextField from 'material-ui/TextField';
import dateToString from '../libs/dateToString';
import DatePicker from 'material-ui/DatePicker';
import Toggle from 'material-ui/Toggle';

const style = {
    height: '80px'
};

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
export default (props) => (
    <div> 
        <div className="table w-100">
            <div className="cell w-50 p-r-15px">
                <Date title="Дата доставки (плановая)"/>
                
            </div>
            <div className="cell w-50 p-l-15px">
                <Toggle
                    style={{width:'150px'}}
                    label="Оплачено"
                />    
            </div>
        </div>  
        <div className="table w-100">
            <div className="cell w-50 p-r-15px">
                <Date title="Дата доставки"/> 
            </div>
            <div className="cell w-50 p-l-15px"> 
                <Toggle
                    style={{width:'150px'}}
                    label="Завершена"
                /> 
            </div>
        </div> 
        
        
           
    </div>
);

