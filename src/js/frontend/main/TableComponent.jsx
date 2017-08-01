import React from 'react';
import ClassName from 'directives/ClassName';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';


import dateToString from 'libs/dateToString';

export default (props) => (
  
  <Table onRowSelection={(array)=>props.setRowState(array)}  >
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Закупка</TableHeaderColumn>
        <TableHeaderColumn>Офис</TableHeaderColumn>
        <TableHeaderColumn>Дата поставки</TableHeaderColumn>
        <TableHeaderColumn>Сумма</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
        {        
            props.purchases.map(x => 
                (<TableRow {...ClassName({pointer: true, paid: x.paid})} key={x.id}>
                    <TableRowColumn>{x.title}</TableRowColumn>
                    <TableRowColumn>{x.office}</TableRowColumn>
                    <TableRowColumn>{dateToString(x.date ? x.date : x.planDate, 'date')}</TableRowColumn>
                    <TableRowColumn>{x.sum}</TableRowColumn>
                </TableRow>)
            )        
        }
      
    </TableBody>
  </Table>

);
