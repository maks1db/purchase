import React from 'react';
import AppBar from 'material-ui/AppBar';
import className from '../directives/className';
import Ico from 'material-ui/svg-icons/action/account-box';
import IconButton from 'material-ui/IconButton';
import If from '../directives/if';

export default (props) => 
(
    <AppBar
    className={className({'menu-open': props.stateMenu})}
    title={props.title}
    onLeftIconButtonTouchTap={()=>{props.onToggle(props.stateMenu);}}
    {...If(Object.keys(props.titleHref).length > 0,
        {
            onTitleTouchTap: () => {},
            iconElementLeft: <IconButton><Ico /></IconButton>
        },
        {})}
    >
    {props.stateMenu && 
        (<div onClick={()=>props.onToggle(true)} className="shadow"></div>)
    }
    </AppBar>
);
