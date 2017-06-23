import React from 'react';
import ActionButton from './ActionButton.jsx';
import Create from 'material-ui/svg-icons/content/create';

const style = (coord) => {
    let obj = {position: 'fixed'};
    const keys = ['bottom', 'top', 'left', 'right'];

    Object.keys(coord).forEach(x=> {
      if (keys.indexOf(x) >= 0){
          obj[x] = `${coord[x]}px`;
      }
    });

    return obj;
};

export default (props) => (
  <div>
    <ActionButton style={style(props)} {...props}>
      {props.children}
    </ActionButton>
  </div>
);