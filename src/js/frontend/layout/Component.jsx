import React from 'react';
import AppBar from './AppBar.jsx';
import Menu from './Menu.jsx';
import Content from './Content.jsx';
import './layout.scss';

export default (props) => (
<div>
    <AppBar 
    title={props.title} 
    stateMenu={props.stateMenu}
    onToggle={props.onToggle} 
    actionTitle={props.titleHref}
    />
    <Menu 
    onToggle={props.onToggle} 
    stateMenu={props.stateMenu}
    />
    <Content paperDepth={props.paperDepth}>
        {props.children}
    </Content>
</div>
);