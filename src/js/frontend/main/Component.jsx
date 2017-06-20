import React from 'react';
import Date from './Date.jsx';

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
            <Date /> 
        </div>
        );
    }
}
