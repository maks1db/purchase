import React from 'react';
import ButtonStyle from './ButtonStyle.jsx';
import Clear from 'material-ui/svg-icons/content/clear';

export default (props) => (
    <ButtonStyle secondary={true} {...props}>
      <Clear />
    </ButtonStyle>
);