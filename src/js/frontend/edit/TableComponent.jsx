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
export default (props) => (
<div style={{padding: '2em 4em'}}>
    <BtnPack {...props} />
    <Table onRowSelection={(array)=>props.childEvent(constants.activeRow, array)}>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Товар</TableHeaderColumn>
        <TableHeaderColumn>Количество</TableHeaderColumn>
        <TableHeaderColumn>Цена</TableHeaderColumn>
        <TableHeaderColumn>Сумма</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
        {        
            props.products.map(x => 
                (<TableRow key={x.id}>
                    <TableRowColumn>{x.title}</TableRowColumn>
                    <TableRowColumn>{x.count}</TableRowColumn>
                    <TableRowColumn>{x.price}</TableRowColumn>
                    <TableRowColumn>{x.count * x.price}</TableRowColumn>
                </TableRow>)
            )        
        }
    </TableBody>
  </Table>
</div>
);