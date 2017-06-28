import React from 'react';
import AppBar from 'material-ui/AppBar';
import ClassName from '../directives/ClassName';
import Ico from 'material-ui/svg-icons/action/account-box';
import IconButton from 'material-ui/IconButton';
import If from '../directives/if';

function openInNewTab(url) {
    var win = window.open(url, '_blank');
    win.focus();
}
export default (props) => 
(
    <AppBar
    {...ClassName({'menu-open': props.stateMenu, 'title-href': props.titleHref !== ''})}
    title={props.title}
    onLeftIconButtonTouchTap={()=>{props.onToggle(props.stateMenu);}}
    {...If(props.titleHref,
        {
            onTitleTouchTap: () => openInNewTab(props.titleHref),
            iconElementRight: <IconButton onTouchTap={()=>openInNewTab(props.titleHref)}><Ico /></IconButton>
        },
        {})}
    >
    {props.stateMenu && 
        (<div onClick={()=>props.onToggle(true)} className="shadow"></div>)
    }
    </AppBar>
);
