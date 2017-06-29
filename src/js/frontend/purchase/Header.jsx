import React from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import dateToString from '../libs/dateToString';
import If from '../directives/if';
import openInNewTab from '../libs/openInNewTab';
const style ={
    position: 'absolute',
    width: '170px',
    top: '103px',
    right: '100px'
};

const styleFinished ={
    position: 'absolute',
    width: '130px',
    bottom: '15px',
    left: '15px'
};

export default (props) => (
    <div>
    {If(props.paid, (<img src="/assets/images/paid.png" style={style} />))}
    {If(props.finished, (<img src="/assets/images/finished.png" style={styleFinished} />))}
     <Card>
        <CardHeader
          className="pointer"
          onTouchTap={()=>openInNewTab(props.orgHref)}
          title={props.orgName}
          subtitle={`Дата доставки: ${props.finished ? dateToString(props.date, 'date') : dateToString(props.planDate, 'date')}`}
          avatar={props.orgAvatar}

        />
        <CardText>
            {props.children}
        </CardText>
      </Card>
      </div>
 
);