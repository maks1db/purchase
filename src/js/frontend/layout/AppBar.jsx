import React from 'react';
import AppBar from 'material-ui/AppBar';
import ClassName from 'directives/ClassName';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import If from 'directives/if';
import openInNewTab from 'libs/openInNewTab';

function IconMenuRight(props){
    return (<IconMenu

        iconButtonElement={
        <IconButton><MoreVertIcon /></IconButton>
        }
        targetOrigin={{horizontal: 'right', vertical: 'top'}}
        anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
        {If(props.titleHref.href,(
        <MenuItem 
            primaryText="Ссылка на тему"
            onTouchTap={() => openInNewTab(props.titleHref.href)}    
        />))}
        
        {If(props.titleHref.albumHref,(<MenuItem 
            primaryText="Ссылка на альбом"
            onTouchTap={() => openInNewTab(props.titleHref.albumHref)} 
        />))}
    </IconMenu>);
}
export default (props) => 
(
    <AppBar
    {...ClassName({'menu-open': props.stateMenu, 'title-href': props.titleHref.href !== undefined })}
    title={props.title}
    onLeftIconButtonTouchTap={()=>{props.onToggle(props.stateMenu);}}
    {...If(Object.keys(props.titleHref).length > 0,
        {
            onTitleTouchTap: () => openInNewTab(props.titleHref.href),
            iconElementRight: IconMenuRight(props)
        },
        {})}
    >
    {props.stateMenu && 
        (<div onClick={()=>props.onToggle(true)} className="shadow"></div>)
    }
    </AppBar>
);
