import React from 'react';
import { connect } from 'react-redux';
import { setTitle, setPaperDepth } from '../actions';
import If from '../directives/if';
import Save from '../activeButtonsComponents/Save.jsx';
import Header from './HeaderComponent.jsx';
import Table from './TableComponent.jsx';
import constants from './constants';
import Dialog from './DialogRow.jsx';
import api from '../api'

function mapStateToProps(state){
    return {

    };
}
function mapDispatchToProps(dispatch){
    return {
        setTitle: (title) => dispatch(setTitle(title)),
        setPaperDepth: (value) => dispatch(setPaperDepth(value))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends React.Component{
    constructor(){
        super();

        this.state = {
            id: 0,
            modify: true,
            title: 'Сало',
            products: [],
            activeRow: [],
            openDialog: false,
            row: {},
            header: {}
        };

        //bind events
        this.childEvent = this.childEvent.bind(this);
    }

    childEvent(type, value){
        switch (type){
            case constants.save:

                if (this.state.id === 0){

                    let h= this.state.header;
                    delete h.id;
                    api.put('purchase', h).then(res=> {
                        this.setState({id: res.data.id});
                    })
                }
                else{
                    api.update('purchase', this.state.id, h).then(x=> {});
                }
                break;
            case constants.activeRow:
                this.setState({activeRow: value});
                break;
            case constants.deleteRow:
                if (value.length > 0){
                    let arr = [...this.state.products];
                    arr.splice(value[0],1);
                    this.setState({products: arr});
                }       
                break;
            case constants.dialogState:
                if (value){
                    this.setState({row: {
                        product: '',
                        price: 0,
                        count: 0,
                        unit: 'шт.',
                        sum: 0,
                        itNew: true,
                        id: 0
                    }});
                }
                this.setState({openDialog: value});
                break;
            case constants.editRow:
                if (value.length > 0){
                    this.setState({row:
                        this.state.products[value[0]],
                    openDialog: true});
                }       
                break;
            case constants.headerChange:
                this.setState({header: value});
                break;
            case constants.saveRow:
                let products = [];
                if (value.id){
                    products = [...this.state.products].map(x => {
                        if(x.id === value.id){
                            x = {...value};
                        }
                        return x;
                    });
                }
                else{
                    value.id = new Date().valueOf();
                    products = [...this.state.products];
                    products.push(value);
                    
                }

                this.setState({'products': products,
                            openDialog: false});
                break;
        }
    }

    componentWillMount(){
        this.props.setTitle('Новая закупка');
        this.props.setPaperDepth(0);
    }

    componentWillUnmount(){
        this.props.setPaperDepth(2);    
    }

    render(){
        return (
        <div>
            <Header purchase={this.state.purchase} childEvent={this.childEvent}/>
            <Table {...this.state} childEvent={this.childEvent} />
            <Save 
                onTouchTap={() => this.childEvent(constants.save, this.state.header)}
                bottom={30} 
                right={30} 
                {...If(this.state.modify, {secondary:true}, {primary:true})} 
            />  
            <Dialog {...this.state} childEvent={this.childEvent} />  
        </div>
        );
    }
}
