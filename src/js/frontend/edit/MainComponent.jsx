import React from 'react';
import Left from './LeftComponent.jsx';
import Right from './RightComponent.jsx';

export default () => 
    (<div className="table w-100">
        <div className="cell w-50 p-r-15px">
            <Left />
        </div>
        <div className="cell w-50 p-l-15px">
            <Right />
        </div>
    </div>);
