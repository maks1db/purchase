import React from 'react';
import { connect } from 'react-redux';
import { setTitle, titleHref } from '../actions';
import ButtonChange from '../activeButtonsComponents/Change.jsx';
import ButtonRemove from '../activeButtonsComponents/Remove.jsx'
import If from '../directives/if';
import {browserHistory} from 'react-router';
import api from '../api';
import Header from './Header.jsx';
import Table from '../edit/TableComponent.jsx'

function mapStateToProps(state){
    return {
        
    };
}
function mapDispatchToProps(dispatch){
    return {
        setTitle: (title) => dispatch(setTitle(title)),
        titleHref: (href) => dispatch(titleHref(href))
    };
}

@connect(mapStateToProps, mapDispatchToProps)
export default class Index extends React.Component{
    constructor(){       
        super();

        this.state = {
            orgName: '',
            orgAvatar: '',
            products: [],
            planDate: undefined,
            date: undefined,
            finished: false,
            paid: false,
            orgHref: ''
        };
    }

    componentWillMount(){
        
        api.getItem('purchase', this.props.params.id).then(res =>{
            document.title = res.data.title;
            this.props.titleHref({href: res.data.href, albumHref: res.data.albumHref});
            this.props.setTitle(document.title + (res.data.finished ? ' (получено)' : ''));
            this.setState({...res.data});
            api.vk.user(res.data.orgHref).then(vk => {
                if (Object.keys(vk.data).length > 0){
                    this.setState({
                        orgName: vk.data.first_name + ' ' + vk.data.last_name,
                        orgAvatar: vk.data.photo_100
                    })
                }
            });

            api.get('product',{query: ['purchase_id = ' + this.props.params.id]})
            .then(x => {
                this.setState({
                    products: x.data
                });
            });
        });
    }

    componentWillUnmount(){
        this.props.titleHref({});
    }

    render(){
        return (
        <div>
            <Header {...this.state}>
                <Table 
                    products={this.state.products}
                    disableEdit={true}
                />
            </ Header>
            <ButtonChange 
                bottom={80} 
                right={30} 
                onTouchTap={() => browserHistory.push('/edit/' + this.props.params.id)}
            />
            <ButtonRemove bottom={30} right={80} />      
        </div>
        );
    }
}
