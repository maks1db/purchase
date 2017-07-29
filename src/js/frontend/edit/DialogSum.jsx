import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import constants from './constants';
import TextField from 'material-ui/TextField';
import bind from 'directives/bind';
import If from 'directives/if';

const Text = (props) => (
    <div style={{textAlign:'center'}}>
    <TextField
        hintText={props.title}
        floatingLabelText={props.title}
        {...props}
    />  
    </div>
);

export default class Component extends React.Component {

    constructor(){
        super();
        this.state = {
            sum: 0
        }; 
    }

    componentWillReceiveProps(nextProps){
        this.setState({sum: nextProps.sum});
    }

    render() {

        const eventClose = () => this.props.childEvent(constants.dialogStateSum, false);
        const actions = [
            <FlatButton
              label="Отмена"
              secondary={true}
              onTouchTap={eventClose}
            />,
            <FlatButton
                label="Изменить"
                primary={true}
                onTouchTap={() => {
                    this.props.setSum(this.state.sum);
                    this.props.childEvent(constants.modify, true);
                    eventClose();
                }
                }
            />];


        return (
            <Dialog
              title="Редактирование суммы"
              actions={actions}
              modal={false}
              open={this.props.openDialogSum}
              onRequestClose={eventClose}
            >
                <Text 
                title="Сумма"
                type="number"
                {...bind(this).byName('sum')}
                />
            </Dialog>
        );
    }
}

