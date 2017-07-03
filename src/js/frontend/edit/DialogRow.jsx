import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import constants from './constants';
import TextField from 'material-ui/TextField';
import bind from '../directives/bind';
import If from '../directives/if';
import AutoComplete from 'material-ui/AutoComplete';

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
            price: '',
            count: '',
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
                {...bind(this).byFunc('count', {
                    onChange: (e, val) => {
                        this.setState({count: parseInt(val).toString()});
                    }
                })}
                />
                <div style={{textAlign:'center'}}>
                <AutoComplete
                    floatingLabelText="Единица измерения"
                    filter={AutoComplete.noFilter}
                    openOnFocus={true}
                    dataSource={this.props.fillData.unit}
                    {...bind(this).byName('unit')}
                    onUpdateInput={(unit)=> this.setState({unit})}
                />
                </div>
                <Text 
                title="Цена"
                type="number"
                {...bind(this).byFunc('price', {
                    onChange: (e, val) => {
                        this.setState({price: parseInt(val).toString()});
                    }
                })}
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

