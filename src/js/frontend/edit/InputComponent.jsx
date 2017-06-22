import React from 'react';
import TextField from 'material-ui/TextField';

const style = {
    height: '80px'
};

export default (props) => (
    <div>     
        <TextField
            hintText="Закупка"
            floatingLabelText="Закупка"
        />    
        <br/>
        <TextField
            hintText="Ссылка на тему"
            floatingLabelText="Ссылка на тему"
        />
        <br/>
        <TextField
            hintText="Ссылка на альбом"
            floatingLabelText="Ссылка на альбом"
        />
        <br/>
        <TextField
            hintText="Организатор"
            floatingLabelText="Организатор"
        />
        <br/>
        <TextField
            hintText="Организатор (ссылка)"
            floatingLabelText="Организатор (ссылка)"
        />
    </div>
);