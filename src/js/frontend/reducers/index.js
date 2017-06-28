import { combineReducers } from 'redux';

import stateMenu from './stateMenu';
import title from './title';
import activeMenu from './activeMenu';
import {reducer as toastr} from 'react-redux-toastr';
import rowState from './rowState';
import paperDepth from './paperDepth.js';
import titleHref from './titleHref.js';

export default combineReducers({ 
    stateMenu, title, activeMenu, toastr, rowState, paperDepth, titleHref
});