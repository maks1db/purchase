import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import React from 'react';

export default (props) => (
<div>
    <Drawer open={props.stateMenu}>
        <MenuItem 
            onClick ={()=>props.onToggle(true)}
            className={'link'} 
            children={<Link to="/" activeClassName="active">Главная</Link>}
        ></MenuItem>
        <MenuItem 
            onClick ={()=>props.onToggle(true)}
            className={'link'} 
            children={<Link to="/history" activeClassName="active">История закупок</Link>}
        ></MenuItem>
    </Drawer>
</div>
);
