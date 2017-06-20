import React from 'react';
import AppBar from 'material-ui/AppBar';
import className from '../directives/className';

// export default class Component extends React.Component{

//     render(){
//         return (
//         <AppBar
//             className={className({'menu-open': this.props.stateMenu})}
//             title={this.props.title}
//             onLeftIconButtonTouchTap={()=>{this.props.onToggle(this.props.stateMenu);}}
//          >
//             {this.props.stateMenu && 
//                 (<div onClick={()=>this.props.onToggle(true)} className="shadow"></div>)
//             }
//         </AppBar>
//         );
//     }
// } 

export default (props) => 
(
    <AppBar
    className={className({'menu-open': props.stateMenu})}
    title={props.title}
    onLeftIconButtonTouchTap={()=>{props.onToggle(props.stateMenu);}}
    >
    {props.stateMenu && 
        (<div onClick={()=>props.onToggle(true)} className="shadow"></div>)
    }
    </AppBar>
);
