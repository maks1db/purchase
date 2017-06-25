import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import constants from './constants';
import TextField from 'material-ui/TextField';
import bind from '../directives/bind';
import If from '../directives/if';

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
            id: 0,
            product: '',
            price: 0,
            count: 0,
            unit: 'шт.',
            itNew: true
        }; 
    }

    componentWillReceiveProps(nextProps){
        this.setState({...nextProps.row});
    }

    render() {

        const eventClose = () => this.props.childEvent(constants.dialogState, false);
        const actions = [
            <FlatButton
              label="Отмена"
              secondary={true}
              onTouchTap={eventClose}
            />,
            If(
                this.state.id === 0,
                <FlatButton
                label="Добавить"
                primary={true}
                onTouchTap={() => this.props.childEvent(constants.saveRow, this.state)}
                />,
                <FlatButton
                label="Изменить"
                primary={true}
                onTouchTap={() => this.props.childEvent(constants.saveRow, this.state)}
                />
            )
        ];

        return (
            <Dialog
              title={If(this.state.id,'Изменить строку', 'Новая строка')}
              actions={actions}
              modal={false}
              open={this.props.openDialog}
              onRequestClose={eventClose}
            >
              <Text 
                title="Товар"
                {...bind(this).byName('product')}
                />
                <Text 
                title="Количество"
                type="number"
                {...bind(this).byName('count')}
                />
                <Text 
                title="Единица измерения"
                {...bind(this).byName('unit')}
                />
                <Text 
                title="Цена"
                type="number"
                {...bind(this).byName('price')}
                />
                <Text 
                title="Сумма"
                type="number"
                value={this.state.price * this.state.count}
                />
            </Dialog>
        );
    }
}

