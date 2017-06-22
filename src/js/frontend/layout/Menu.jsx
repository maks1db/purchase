import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import className from '../directives/className'; 
import React from 'react';

// export default class Component extends React.Component{
    
//     render(){
        
//         return (
//         <div>
//             <Drawer open={this.props.stateMenu}>
//                 <MenuItem 
//                     onClick ={()=>this.props.onToggle(true)}
//                     className={className('link')} 
//                     children={<Link to="/" activeClassName="active">Главная</Link>}
//                 ></MenuItem>
//             </Drawer>
//         </div>
//         );
//     }
// }

export default (props) => (
<div>
    <Drawer open={props.stateMenu}>
        <MenuItem 
            onClick ={()=>props.onToggle(true)}
            className={className('link')} 
            children={<Link to="/" activeClassName="active">Главная</Link>}
        ></MenuItem>
        <MenuItem 
            onClick ={()=>props.onToggle(true)}
            className={className('link')} 
            children={<Link to="/history" activeClassName="active">История закупок</Link>}
        ></MenuItem>
    </Drawer>
</div>
);
