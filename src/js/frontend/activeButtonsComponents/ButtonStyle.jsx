import React from 'react';
import ActionButton from './ActionButton.jsx';
import Create from 'material-ui/svg-icons/content/create';

const keys = ['bottom', 'top', 'left', 'right'];

const style = (coord) => {
    let obj = {position: 'fixed'};

    Object.keys(coord).forEach(x=> {
      if (keys.indexOf(x) >= 0){
          obj[x] = `${coord[x]}px`;
      }
    });

    return obj;
};

export default (props) =>{
    let btn = Object.assign({}, props);
    let coord = {};

    keys.forEach( x => {
        if (btn.hasOwnProperty(x)){
            coord[x] = btn[x];
            delete btn[x];
        }
    });

    if (btn.hasOwnProperty('childEvent')){
        delete btn.childEvent;
    }

    return (
        <ActionButton style={style(coord)} {...btn}>
          {props.children}
        </ActionButton>
    );
};