import React from 'react';
import Button from './ActionButton.jsx';
import Create from 'material-ui/svg-icons/content/create';

const style = (bottom = 30, right = 30) => {
    return {
        position: 'fixed',
        bottom: `${bottom}px`,
        right: `${right}px`
    };
};

export default (props) => (
  <div>
    <Button style={style(props.bottom, props.right)} {...props}>
      {props.children}
    </Button>
  </div>
);