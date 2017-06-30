import React from 'react';
import { connect } from 'react-redux';
import { setTitle, setPaperDepth } from '../actions';
import If from '../directives/if';
import Save from '../activeButtonsComponents/Save.jsx';
import Header from './HeaderComponent.jsx';
import Table from './TableComponent.jsx';
import constants from './constants';
import Dialog from './DialogRow.jsx';
import api from '../api';
import {toastr} from 'react-redux-toastr';
import {browserHistory} from 'react-router';

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
            title: '',
            products: [],
            activeRow: [],
            openDialog: false,
            row: {},
            header: {},
            sum: 0,
            fillData: {org: [], unit: [], office: []}
        };

        //bind events
        this.childEvent = this.childEvent.bind(this);
    }

    childEvent(type, value){
        switch (type){
            case constants.save:
                let h = this.state.header;
                let sum = 0;
                this.state.products.forEach((x) => {
                    sum += parseInt(x.count) * parseInt(x.price);  
                });
                h.sum = sum;
                delete h.id;
                const saveRows = (id) => {
                    let p = [];
                    let base = [...this.state.products];
                    
                    base.forEach(x => {
                        x.purchaseId = id;
                        delete x.id;
                        delete x.sum;
                        delete x.itNew;

                        p.push(api.put('product', x))
                    })
                    return Promise.all(p);
                }
                if (this.state.id === 0){
                    api.put('purchase', h).then(res=> {
                        saveRows(res.data.id).then(resRows =>{
                            this.setState({id: res.data.id});
                            toastr.success('Сохранение', 'Данные успешно сохранены');
                        });
                    });
                }
                else{
                    api.update('purchase', this.state.id, h).then(x=> {
                        saveRows(this.state.id).then(resRows =>{
                            toastr.success('Сохранение', 'Данные успешно сохранены')
                        });
                    });
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
            case constants.changeOrgHref: 
                return api.vk.user(value);
        }
    }

    componentWillMount(){
        
        this.props.setPaperDepth(0);

        let id = this.props.params.id;
        if (id){
            this.setState({id});
            api.getItem('purchase',id)
            .then(result => {
                let data = result.data;
                if (data.date) data.date = new Date(data.date);
                if (data.planDate) data.planDate = new Date(data.planDate);
                this.setState({header: data});
                document.title = data.title;
                this.props.setTitle(data.title);
            });

            api.get('product', {
                query: ['purchase_id = ' + id]
            }).then( x => {
                var a = 1;
                this.setState({products: x.data});
        
            });
        }
        else{
            this.props.setTitle('Новая закупка');
            document.title = "Новая закупка";
        }

        Promise.all([
            api.fill.org(),
            api.fill.office(),
            api.fill.unit()
        ])
        .then(x => {
            this.setState({fillData: {
                org: x[0].data,
                office: x[1].data,
                unit: x[2].data
            }})
        })
    }

    componentWillUnmount(){
        this.props.setPaperDepth(2);    
    }

    render(){
        return (
        <div>
            <Header 
            orgHref={(name)=>api.fill.orgHref(name)}
            header={this.state.header} 
            fillData={this.state.fillData} 
            childEvent={this.childEvent}/>
            <Table {...this.state} sum={0} fillData={this.state.fillData} childEvent={this.childEvent} />
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
