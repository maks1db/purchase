import React from 'react';
import TextField from 'material-ui/TextField';

const style = {
    height: '80px'
};

const Text = (props) => (
    <TextField
        hintText={props.title}
        floatingLabelText={props.title}
        fullWidth={true}
    />  
);

export default (props) => (
    <div>     
          
        <div className="table w-100">
            <div className="cell w-50 p-r-15px">
                <Text title="Закупка" />
            </div>
            <div className="cell w-50 p-l-15px">
                <Text title="Офис" /> 
            </div>
        </div>
        <div className="table w-100">
            <div className="cell w-50 p-r-15px">
                <Text title="Ссылка на тему" /> 
            </div>
            <div className="cell w-50 p-l-15px">
                <Text title="Ссылка на альбом" /> 
            </div>
        </div>
        <div className="table w-100">
            <div className="cell w-50 p-r-15px">
                <Text title="Организатор" />
            </div>
            <div className="cell w-50 p-l-15px">
                <Text title="Организатор (ссылка)" />
            </div>
        </div>
    </div>
);