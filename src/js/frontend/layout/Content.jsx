import Paper from 'material-ui/Paper';
import React from 'react';

export default (props) => (
    <div style={{padding:'1em'}}>
        <Paper zDepth={2} style={{padding:'1em'}}>
            {props.children}   
        </Paper>
    </div>
);
