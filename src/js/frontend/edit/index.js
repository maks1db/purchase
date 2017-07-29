import React from 'react';
import { connect } from 'react-redux';
import { setTitle, setPaperDepth, setSum } from '../actions';
import If from 'directives/if';
import Save from 'activeButtons/Save.jsx';
import Total from 'activeButtons/ShopCart.jsx';
import Header from './HeaderComponent.jsx';
import Table from './TableComponent.jsx';
import constants from './constants';
import Dialog from './DialogRow.jsx';
import DialogSum from './DialogSum.jsx';
import api from '../api';
import {toastr} from 'react-redux-toastr';
import {browserHistory} from 'react-router';

function mapStateToProps(state){
    return {
        sum: state.purchaseSum
    };
}
function mapDispatchToProps(dispatch){
    return {
        setTitle: (title) => dispatch(setTitle(title)),
        setPaperDepth: (value) => dispatch(setPaperDepth(value)),
        setSum: (value) => dispatch(setSum(value))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends React.Component{
    constructor(){
        super();

        this.state = {
            id: 0,
            modify: false,
            title: '',
            products: [],
            activeRow: [],
            openDialog: false,
            openDialogSum: false,
            row: {},
            header: {},
            fillData: {org: [], unit: [], office: []}
        };

        //bind events
        this.childEvent = this.childEvent.bind(this);
    }

    childEvent(type, value){
        switch (type){
            case constants.save:
                let h = {...this.state.header};
                if (h.finished && !h.date){
                    h.date = new Date();
                    this.setState({
                        header: h
                    })
                }
                let sum = this.props.sum;
                if (h.date){
                    h.date = h.date.valueOf() < 0 ? 0 : h.date.valueOf();
                }

                if (h.planDate){
                    h.planDate = h.planDate.valueOf() < 0 ? 0 : h.planDate.valueOf();
                }
                h.sum = sum;
                delete h.id;
                const saveRows = (id) => {
                    let p = [];
                    let base = [...this.state.products];
                    
                    base.forEach(x => {
                        let row = Object.assign({}, x);
                        row.purchaseId = id;
                        delete row.id;
                        delete row.sum;
                        delete row.itNew;

                        p.push(api.put('product', row))
                    })
                    return Promise.all(p);
                }
                if (this.state.id === 0){
                    api.put('purchase', h).then(res=> {
                        saveRows(res.data.id).then(resRows =>{
                            this.setState({id: res.data.id});
                            toastr.success('Сохранение', 'Данные успешно сохранены');
                            this.setState({modify: false});
                        });
                    });
                }
                else{
                    api.update('purchase', this.state.id, h).then(x=> {
                        saveRows(this.state.id).then(resRows =>{
                            toastr.success('Сохранение', 'Данные успешно сохранены');
                            this.setState({modify: false});
                        });
                    });
                }
                break;
            case constants.activeRow:
                this.setState({activeRow: value});
                break;
            case constants.modify:
                this.setState({modify: value});
                break;
            case constants.deleteRow:
                if (value.length > 0){
                    let arr = [...this.state.products];
                    arr.splice(value[0],1);
                    this.setState({products: arr, modify: true});
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
            case constants.dialogStateSum:
                this.setState({openDialogSum: value});
                break;
            case constants.editRow:
                if (value.length > 0){
                    this.setState({row:
                        this.state.products[value[0]],
                    openDialog: true});
                }       
                break;
            case constants.headerChange:
                this.setState({header: value, modify: true});
                break;
            case constants.saveRow:
                let products = [];

                let sumBefore = 0;
                this.state.products.forEach(x=>sumBefore += x.price * x.count);
                
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
                    products = [ ...this.state.products];
                    products.push(value);
                    
                }

                this.setState({'products': products,
                            openDialog: false, modify: true});
                break;
            case constants.changeOrgHref: 
                return api.vk.user(value);
        }
    }

    componentWillMount(){
        
        this.props.setPaperDepth(0);
        this.props.setSum(0);

        let id = this.props.params.id;
        if (id){
            this.setState({id});
            api.getItem('purchase',id)
            .then(result => {
                let data = result.data;
                if (data.date) data.date = new Date(data.date).valueOf() <= 0 ? undefined : new Date(data.date);
                if (data.planDate) data.planDate = new Date(data.planDate).valueOf() <= 0 ? undefined : new Date(data.planDate);
                this.setState({header: data});

                this.props.setSum(data.sum);
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
            <Table {...this.state} 
                sum={this.props.sum} 
                fillData={this.state.fillData} 
                childEvent={this.childEvent} />
            <Save 
                onTouchTap={() => this.childEvent(constants.save, this.state.header)}
                bottom={30} 
                right={30} 
                {...If(this.state.modify, {secondary:true}, {})} 
            />  
            {If(this.state.products.length > 0,
                (<Total 
                bottom={180} 
                left={30}
                mini={true}
                secondary={true}
                onTouchTap={()=>{
                    let sum = 0;
                    this.state.products.forEach((x) => {
                        sum += parseInt(x.count) * parseInt(x.price);  
                    });
                    this.props.setSum(sum);
                }}
            />))
            }
            <Dialog {...this.state} childEvent={this.childEvent} />  
            <DialogSum {...this.state} 
                sum={this.props.sum} 
                childEvent={this.childEvent} 
                setSum={this.props.setSum}/>
        </div>
        );
    }
}
