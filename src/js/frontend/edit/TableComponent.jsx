import React from 'react';
import Add from '../activeButtonsComponents/Add.jsx';
import Change from '../activeButtonsComponents/Change.jsx';
import Remove from '../activeButtonsComponents/Remove.jsx';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import If from '../directives/if';
import ClassName from '../directives/ClassName';
import constants from './constants';

const BtnPack = (props) => (
    <div>
        <Add 
            bottom={130} 
            left={30} 
            mini={true}
            onTouchTap={() => props.childEvent(constants.dialogState, true)} />
        <Change 
            bottom={80} 
            left={30} 
            mini={true} 
            onTouchTap={() => props.childEvent(constants.editRow, props.activeRow)}
            {...If(props.activeRow.length === 0, {disabled:true}, {})}
         />
        <Remove 
            bottom={30} 
            left={30} 
            mini={true} 
            {...If(props.activeRow.length === 0, {disabled:true}, {})} 
            onTouchTap={() => props.childEvent(constants.deleteRow, props.activeRow)}
            />
    </div>
);
export default (props) => {
    let sum = props.sum;
    // props.products.forEach((x) => {
    //     sum += parseInt(x.count) * parseInt(x.price);  
    // });
    return (
<div style={{padding: '2em 4em'}}>
    {If(!props.disableEdit, (<BtnPack {...props} />))}
    <Table 
        {...If(!props.disableEdit,
            {onRowSelection:(array)=>props.childEvent(constants.activeRow, array)},{})}>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Товар</TableHeaderColumn>
        <TableHeaderColumn>Количество</TableHeaderColumn>
        <TableHeaderColumn>Ед.</TableHeaderColumn>
        <TableHeaderColumn>Цена</TableHeaderColumn>
        <TableHeaderColumn>Сумма</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
        {        
            props.products.map((x, i) => 
                (<TableRow key={x.id}
                    {...If(!props.disableEdit, 
                        {selected: props.activeRow && props.activeRow.indexOf(i) >= 0},
                        {}
                    )}                          
                    >
                    <TableRowColumn>{x.product}</TableRowColumn>
                    <TableRowColumn>{x.count}</TableRowColumn>
                    <TableRowColumn>{x.unit}</TableRowColumn>
                    <TableRowColumn>{x.price}</TableRowColumn>
                    <TableRowColumn>{x.count * x.price}</TableRowColumn>
                </TableRow>)
            )        
        }
        
    </TableBody>
  </Table>
  {props.products.length > 0 && 
  (<div  
    {...ClassName({'table w-100': true, pointer: !props.disableEdit})}
    style={{paddingTop: '2em', fontSize: '14px', fontWeight: 'bold'}}
    {...If(!props.disableEdit,
            {onClick:()=>props.childEvent(constants.dialogStateSum, true)},{})}
    >
        <div className="cell w-50 p-r-15px p-l-15px">
            Итого
        </div>
        <div className="cell w-50 p-l-15px p-r-15px" style={{textAlign:'right'}}>
            {sum}
        </div>
    </div>)
  }
</div>);
};