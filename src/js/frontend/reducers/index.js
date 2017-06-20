import { combineReducers } from 'redux';

import stateMenu from './stateMenu';
import title from './title';
import activeMenu from './activeMenu';
import {reducer as toastr} from 'react-redux-toastr';

export default combineReducers({ 
    stateMenu, title, activeMenu, toastr
});