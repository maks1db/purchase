import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import constants from './constants';

export default (props) => {

    const eventClose = () => props.childEvent(constants.dialogState, false);
    const actions = [
      <FlatButton
        label="Отмена"
        secondary={true}
        onTouchTap={eventClose}
      />,
      <FlatButton
        label="Добавить"
        primary={true}
        onTouchTap={() => {}}
      />,
    ];

    return (
        <Dialog
          title="Новая строка"
          actions={actions}
          modal={false}
          open={props.dialogState}
          onRequestClose={eventClose}
        >
          The actions in this window were passed in as an array of React objects.
        </Dialog>
    );
};
