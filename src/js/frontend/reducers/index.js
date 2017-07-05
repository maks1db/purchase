import { combineReducers } from 'redux';

import stateMenu from './stateMenu';
import title from './title';
import {reducer as toastr} from 'react-redux-toastr';
import rowState from './rowState';
import paperDepth from './paperDepth.js';
import titleHref from './titleHref.js';
import purchaseSum from './purchaseSum.js';

export default combineReducers({ 
    stateMenu, title, toastr, rowState, paperDepth, titleHref, purchaseSum
});